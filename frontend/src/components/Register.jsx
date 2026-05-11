import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser } from "../store/UserSlice"
import { Box, Button, TextField, Typography, Paper, Tab, Tabs } from "@mui/material"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SchoolIcon from "@mui/icons-material/School"
import SmartToyIcon from "@mui/icons-material/SmartToy"

const BotIcon = () => (
    <Box sx={{
        width: 72, height: 72, borderRadius: "50%",
        background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
        display: "flex", alignItems: "center", justifyContent: "center",
        mb: 2, boxShadow: "0 0 40px rgba(167,139,250,0.3)",
        animation: "float 3s ease-in-out infinite"
    }}>
        <SmartToyIcon sx={{ fontSize: 38, color: "#fff" }} />
    </Box>
)

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.user)
    const [tab, setTab] = useState(0)
    const [form, setForm] = useState({ name: "", phone: "" })
    const [adminCode, setAdminCode] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (tab === 1) {
            if (adminCode === "admin123") navigate("/admin")
            else alert("Invalid admin code")
            return
        }
        const result = await dispatch(addUser(form))
        if (result.meta.requestStatus === "fulfilled") navigate("/learn")
    }

    return (
        <Box sx={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex", justifyContent: "center", alignItems: "center"
        }}>

            <Paper elevation={0} sx={{
                p: 5, width: 440, borderRadius: 5,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(24px)",
                animation: "fadeIn 0.6s ease forwards"
            }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <BotIcon />
                    <Typography variant="h4" fontWeight={800} letterSpacing={-1} sx={{ color: "#fff", mt: 1 }}>
                        AI Learning Hub
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: 0.5 }}>
                        Hi! I'm Lexi 👋 your personal AI tutor
                    </Typography>
                </Box>

                <Tabs value={tab} onChange={(_, v) => setTab(v)} centered
                    sx={{ mb: 3, "& .MuiTab-root": { color: "rgba(255,255,255,0.5)" }, "& .Mui-selected": { color: "#fff" } }}>
                    <Tab icon={<SchoolIcon />} label="Student" iconPosition="start" />
                    <Tab icon={<AdminPanelSettingsIcon />} label="Admin" iconPosition="start" />
                </Tabs>

                <form onSubmit={handleSubmit}>
                    {tab === 0 ? (
                        <>
                            <TextField fullWidth label="Full Name" margin="normal"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                InputLabelProps={{ style: { color: "rgba(255,255,255,0.5)" } }}
                                sx={{ "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.2)" }, "&:hover fieldset": { borderColor: "#a78bfa" }, "&.Mui-focused fieldset": { borderColor: "#a78bfa" } } }} />
                            <TextField fullWidth label="Phone Number" margin="normal"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                InputLabelProps={{ style: { color: "rgba(255,255,255,0.5)" } }}
                                sx={{ "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.2)" }, "&:hover fieldset": { borderColor: "#a78bfa" }, "&.Mui-focused fieldset": { borderColor: "#a78bfa" } } }} />
                        </>
                    ) : (
                        <TextField fullWidth label="Admin Code" margin="normal" type="password"
                            value={adminCode}
                            onChange={(e) => setAdminCode(e.target.value)}
                            InputLabelProps={{ style: { color: "rgba(255,255,255,0.5)" } }}
                            sx={{ "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.2)" }, "&:hover fieldset": { borderColor: "#a78bfa" } } }} />
                    )}

                    {error && <Typography color="error" mt={1} fontSize={13}>{error}</Typography>}

                    <Button fullWidth variant="contained" type="submit" size="large" disabled={loading}
                        sx={{
                            mt: 3, py: 1.5, borderRadius: 3, fontWeight: 700, fontSize: 15,
                            background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                            color: "#fff",
                            boxShadow: "0 4px 24px rgba(167,139,250,0.35)",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 32px rgba(167,139,250,0.5)" },
                            transition: "all 0.25s ease"
                        }}>
                        {loading ? "Loading..." : tab === 0 ? "Let's Learn! 🚀" : "Enter Dashboard"}
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}
