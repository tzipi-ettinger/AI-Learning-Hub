import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers, fetchAllHistory } from "../store/AdminSlice"
import {
    Box, Chip, Dialog, DialogContent, DialogTitle, IconButton,
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Avatar, Container, Divider
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import BotSVG from "./BotSVG"

export default function Admin() {
    const dispatch = useDispatch()
    const { users, history } = useSelector((state) => state.admin)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        dispatch(fetchAllUsers())
        dispatch(fetchAllHistory())
    }, [dispatch])

    const userHistory = history.filter((h) => h.user_id?._id === selectedUser?._id)

    return (
        <Box minHeight="100vh" bgcolor="#0f0c29" color="#fff" py={8}>
            <Container maxWidth="lg">

                <Box display="flex" flexDirection="column" alignItems="center" mb={6} sx={{ animation: "fadeIn 0.6s ease-out" }}>
                    <Box sx={{
                        width: 60, height: 60, borderRadius: "20px",
                        background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 20px rgba(167,139,250,0.4)",
                        mb: 2
                    }}>
                        <AdminPanelSettingsIcon sx={{ color: "white", fontSize: 32 }} />
                    </Box>
                    <Typography variant="h3" fontWeight={800} letterSpacing={-1}>Admin Control</Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.5)" sx={{ mb: 2 }}>
                        Manage users and monitor learning progress
                    </Typography>
                    <Chip
                        label={`${users.length} registered users`}
                        sx={{
                            background: "rgba(167,139,250,0.1)",
                            color: "#a78bfa",
                            fontWeight: 700,
                            border: "1px solid rgba(167,139,250,0.2)"
                        }}
                    />
                </Box>

                <TableContainer component={Paper} sx={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 5,
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
                                <TableCell sx={{ color: "#a78bfa", fontWeight: 800, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>USER</TableCell>
                                <TableCell sx={{ color: "#a78bfa", fontWeight: 800, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>PHONE</TableCell>
                                <TableCell sx={{ color: "#a78bfa", fontWeight: 800, borderBottom: "1px solid rgba(255,255,255,0.08)" }} align="right">SESSIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow
                                    key={u._id}
                                    onClick={() => setSelectedUser(u)}
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": { background: "rgba(167,139,250,0.05)" },
                                        "& td": { borderBottom: "1px solid rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.8)" }
                                    }}
                                >
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar sx={{
                                                width: 36, height: 36,
                                                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                                                fontWeight: 700, fontSize: 14
                                            }}>
                                                {u.name[0]}
                                            </Avatar>
                                            <Typography fontWeight={600}>{u.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'monospace' }}>{u.phone}</TableCell>
                                    <TableCell align="right">
                                        <Chip
                                            size="small"
                                            label={history.filter((h) => h.user_id?._id === u._id).length}
                                            sx={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa", fontWeight: 700 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            background: "#0f0c29",
                            border: "1px solid rgba(167,139,250,0.3)",
                            borderRadius: 5,
                            color: "#fff"
                        }
                    }}
                >
                    <DialogTitle sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar sx={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)" }}>
                                    {selectedUser?.name[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight={700}>{selectedUser?.name}</Typography>
                                    <Typography variant="caption" color="rgba(255,255,255,0.4)">User History & Insights</Typography>
                                </Box>
                                <Paper sx={{
                                    p: 2.5, mb: 2, borderRadius: 2,
                                    background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.2))",
                                    border: "1px solid rgba(167,139,250,0.25)"
                                }}>
                                    <Typography variant="caption" sx={{ color: "#a78bfa", mb: 1, display: "block", fontWeight: 600 }}>Question</Typography>
                                    <Typography fontSize={13} sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>{h.prompt}</Typography>
                                </Paper>
                                <Paper sx={{ p: 2.5, borderRadius: 2, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                        <BotSVG size={14} />
                                        <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 600 }}>Lexi's Answer</Typography>
                                    </Box>
                                    <Typography fontSize={13} lineHeight={1.9} sx={{ color: "rgba(255,255,255,0.75)" }}>{h.response}</Typography>
                                </Paper>
                            </Box>
                            <IconButton onClick={() => setSelectedUser(null)} sx={{ color: "rgba(255,255,255,0.5)" }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        {userHistory.length === 0 ? (
                            <Typography color="rgba(255,255,255,0.3)" textAlign="center" py={5}>No sessions recorded for this user.</Typography>
                        ) : (
                            userHistory.map((h, i) => (
                                <Box key={h._id} sx={{
                                    mb: 3, p: 3, borderRadius: 4,
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)"
                                }}>
                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Box display="flex" gap={1}>
                                            <Chip label={h.category_id?.name} size="small" sx={{ bgcolor: "rgba(59,130,246,0.1)", color: "#3b82f6", fontWeight: 600 }} />
                                            <Chip label={h.sub_category_id?.name} size="small" sx={{ bgcolor: "rgba(139,92,246,0.1)", color: "#8b5cf6", fontWeight: 600 }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 12 }} />
                                            {new Date(h.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 700, display: 'block', mb: 0.5 }}>PROMPT</Typography>
                                        <Typography variant="body2" sx={{ color: "#fff" }}>{h.prompt}</Typography>
                                    </Box>

                                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.05)" }} />

                                    <Box>
                                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                            <SmartToyIcon sx={{ fontSize: 14, color: "#60a5fa" }} />
                                            <Typography variant="caption" sx={{ color: "#60a5fa", fontWeight: 700 }}>LEXI'S RESPONSE</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{h.response}</Typography>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    )
}