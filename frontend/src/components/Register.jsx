import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser } from "../store/UserSlice"
import { Box, Button, TextField, Typography, Paper, Tab, Tabs } from "@mui/material"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SchoolIcon from "@mui/icons-material/School"
import BotSVG from "./BotSVG"

/** Floating bot icon for the register page */
const BotIcon = () => (
    <Box sx={{ mb: 2, animation: "float 3s ease-in-out infinite", filter: "drop-shadow(0 0 12px rgba(167,139,250,0.5))" }}>
        <BotSVG size={90} />
    </Box>
)

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.user)
    const [tab, setTab] = useState(0)
    const [form, setForm] = useState({ name: "", phone: "" })
    const [adminCode, setAdminCode] = useState("")

    const handleAdminLogin = () => {
        if (adminCode === "admin123") navigate("/admin")
        else alert("Invalid admin code")
    }

    /** Registers or logs in user by phone number */
    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(addUser(form))
        if (result.meta.requestStatus === "fulfilled") navigate("/learn")
    }

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
            "&:hover fieldset": { borderColor: "#a78bfa" },
            "&.Mui-focused fieldset": { borderColor: "#a78bfa" }
        },
        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }
    }

    const btnSx = {
        mt: 3, py: 1.5, borderRadius: 3, fontWeight: 700, fontSize: 15,
        background: "#5a5a6e",
        color: "#fff",
        boxShadow: "0 4px 24px rgba(90,90,110,0.4)",
        "&:hover": { transform: "translateY(-2px)", background: "#6e6e85" },
        transition: "all 0.25s ease"
    }

    return (
        <Box sx={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex", justifyContent: "center", alignItems: "center"
        }}>
            <Paper elevation={0} sx={{
                p: 5, width: 440, borderRadius: 5,
                background: "linear-gradient(160deg, #1a1a3e 0%, #2d2b6b 100%)",
                backdropFilter: "blur(24px)",
                animation: "fadeIn 0.6s ease forwards"
            }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Box sx={{ animation: "float 3s ease-in-out infinite", mb: 2 }}>
                        <BotSVG size={110} />
                    </Box>
                    <Typography variant="h4" fontWeight={800} letterSpacing={-1} sx={{ color: "#fff" }}>
                        AI Learning Hub
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: 0.5 }}>
                        Hi! I'm Lexi your personal AI tutor
                    </Typography>
                </Box>

                <Tabs value={tab} onChange={(_, v) => setTab(v)} centered
                    sx={{ mb: 3, "& .MuiTab-root": { color: "rgba(255,255,255,0.5)" }, "& .Mui-selected": { color: "#a78bfa" } }}>
                    <Tab icon={<SchoolIcon />} label="Student" iconPosition="start" />
                    <Tab icon={<AdminPanelSettingsIcon />} label="Admin" iconPosition="start" />
                </Tabs>

                {tab === 0 ? (
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="Full Name" margin="normal"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            sx={fieldSx} />
                        <TextField fullWidth label="Phone Number" margin="normal"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            sx={fieldSx} />
                        {error && <Typography color="error" mt={1} fontSize={13}>{error}</Typography>}
                        <Button fullWidth variant="contained" type="submit" size="large" disabled={loading} sx={btnSx}>
                            {loading ? "Loading..." : "Let's Learn!"}
                        </Button>
                    </form>
                ) : (
                    <Box>
                        <TextField fullWidth label="Admin Code" margin="normal" type="password"
                            value={adminCode}
                            onChange={(e) => setAdminCode(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                            sx={fieldSx} />
                        <Button fullWidth variant="contained" size="large" onClick={handleAdminLogin} sx={btnSx}>
                            Enter Dashboard
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    )
}
