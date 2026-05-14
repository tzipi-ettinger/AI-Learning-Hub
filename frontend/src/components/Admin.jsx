/** Admin component - displays all users and their learning history */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers, fetchAllHistory } from "../store/AdminSlice"
import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, Divider } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import SmartToyIcon from "@mui/icons-material/SmartToy"
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
        <Box minHeight="100vh"  py={6} px={4} sx={{ animation: "fadeIn 0.5s ease forwards" }}>

            {/* Header */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1} mb={5}>
                <Box sx={{
                    width: 56, height: 56, borderRadius: "16px",
                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 20px rgba(167,139,250,0.4)"
                }}>
                    <AdminPanelSettingsIcon sx={{ color: "white", fontSize: 30 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} color="#fff">Admin Dashboard</Typography>
                <Chip label={`${users.length} registered users`} size="small"
                    sx={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }} />
            </Box>

            {/* Users Table */}
            <TableContainer component={Paper} sx={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 4, maxWidth: 720, mx: "auto"
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#a78bfa", fontWeight: 800 }}>USER</TableCell>
                            <TableCell sx={{ color: "#a78bfa", fontWeight: 800 }}>PHONE</TableCell>
                            <TableCell sx={{ color: "#a78bfa", fontWeight: 800 }} align="right">SESSIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u._id} onClick={() => setSelectedUser(u)}
                                sx={{ cursor: "pointer", "&:hover": { background: "rgba(167,139,250,0.05)" },
                                    "& td": { color: "rgba(255,255,255,0.8)" } }}>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1.5}>
                                        <Avatar sx={{ width: 34, height: 34, background: "linear-gradient(135deg, #a78bfa, #60a5fa)", fontSize: 14, fontWeight: 700 }}>
                                            {u.name[0]}
                                        </Avatar>
                                        <Typography fontWeight={600}>{u.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{u.phone}</TableCell>
                                <TableCell align="right">
                                    <Chip size="small" label={history.filter((h) => h.user_id?._id === u._id).length}
                                        sx={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa", fontWeight: 700 }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* User History Dialog */}
            <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar sx={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)" }}>
                                {selectedUser?.name[0]}
                            </Avatar>
                            <Box>
                                <Typography fontWeight={700}>{selectedUser?.name}</Typography>
                                <Typography variant="caption" color="rgba(255,255,255,0.4)">Learning History</Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={() => setSelectedUser(null)}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    {userHistory.length === 0 ? (
                        <Typography color="text.secondary" textAlign="center" py={4}>No sessions yet.</Typography>
                    ) : (
                        userHistory.map((h) => (
                            <Box key={h._id} sx={{ mb: 3, p: 3, borderRadius: 3, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Box display="flex" gap={1}>
                                        <Chip label={h.category_id?.name} size="small" color="primary" />
                                        <Chip label={h.sub_category_id?.name} size="small" color="secondary" />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <CalendarTodayIcon sx={{ fontSize: 12 }} />
                                        {new Date(h.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 700, display: "block", mb: 0.5 }}>PROMPT</Typography>
                                <Typography variant="body2" color="#fff" mb={2}>{h.prompt}</Typography>
                                <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2 }} />
                                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                    <BotSVG size={16} />
                                    <Typography variant="caption" sx={{ color: "#60a5fa", fontWeight: 700 }}>LEXI'S RESPONSE</Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{h.response}</Typography>
                            </Box>
                        ))
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    )
}
