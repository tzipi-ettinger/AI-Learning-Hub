import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers, fetchAllHistory } from "../store/AdminSlice"
import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SmartToyIcon from "@mui/icons-material/SmartToy"

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
        <Box minHeight="100vh" p={4} sx={{ animation: "fadeIn 0.5s ease forwards" }}>

            <Box display="flex" flexDirection="column" alignItems="center" gap={1} mb={4}>
                <Box sx={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <AdminPanelSettingsIcon sx={{ color: "white" }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" textAlign="center">Admin Dashboard</Typography>
                <Chip label={`${users.length} users`} size="small"
                    sx={{ background: "rgba(124,58,237,0.2)", color: "#7c3aed" }} />
            </Box>

            <TableContainer component={Paper} sx={{
                background: "rgba(19,19,26,0.9)", border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 3, maxWidth: 720, mx: "auto"
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#7c3aed", fontWeight: "bold" }}>User</TableCell>
                            <TableCell sx={{ color: "#7c3aed", fontWeight: "bold" }}>Phone</TableCell>
                            <TableCell sx={{ color: "#7c3aed", fontWeight: "bold" }}>Sessions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u._id} hover sx={{ cursor: "pointer", "&:hover": { background: "rgba(124,58,237,0.1)" } }}
                                onClick={() => setSelectedUser(u)}>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1.5}>
                                        <Avatar sx={{ width: 32, height: 32, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", fontSize: 14 }}>
                                            {u.name[0]}
                                        </Avatar>
                                        {u.name}
                                    </Box>
                                </TableCell>
                                <TableCell>{u.phone}</TableCell>
                                <TableCell>
                                    <Chip size="small" label={history.filter((h) => h.user_id?._id === u._id).length}
                                        sx={{ background: "rgba(124,58,237,0.2)", color: "#7c3aed" }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)} maxWidth="md" fullWidth
                PaperProps={{ sx: { background: "#13131a", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 3 } }}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar sx={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                                {selectedUser?.name[0]}
                            </Avatar>
                            <Typography fontWeight="bold">{selectedUser?.name}'s Sessions</Typography>
                        </Box>
                        <IconButton onClick={() => setSelectedUser(null)}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {userHistory.length === 0 ? (
                        <Typography color="text.secondary" textAlign="center" py={3}>No sessions yet.</Typography>
                    ) : (
                        userHistory.map((h) => (
                            <Box key={h._id} sx={{ mb: 4, p: 3, borderRadius: 3, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <Box display="flex" gap={1} mb={2.5} alignItems="center" flexWrap="wrap">
                                    <Chip label={h.category_id?.name} size="small" color="primary" />
                                    <Chip label={h.sub_category_id?.name} size="small" color="secondary" />
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Typography variant="caption" color="text.disabled">
                                        {new Date(h.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Paper sx={{ p: 2.5, mb: 2, borderRadius: 2,
                                    background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.2))",
                                    border: "1px solid rgba(167,139,250,0.25)" }}>
                                    <Typography variant="caption" sx={{ color: "#a78bfa", mb: 1, display: "block", fontWeight: 600 }}>Question</Typography>
                                    <Typography fontSize={13} sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>{h.prompt}</Typography>
                                </Paper>
                                <Paper sx={{ p: 2.5, borderRadius: 2, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                        <SmartToyIcon sx={{ fontSize: 13, color: "#a78bfa" }} />
                                        <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 600 }}>Lexi's Answer</Typography>
                                    </Box>
                                    <Typography fontSize={13} lineHeight={1.9} sx={{ color: "rgba(255,255,255,0.75)" }}>{h.response}</Typography>
                                </Paper>
                            </Box>
                        ))
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    )
}
