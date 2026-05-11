import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchCategories, fetchSubCategories } from "../store/CategorySlice"
import { sendPrompt } from "../store/SubCategorySlice"
import { Box, Button, MenuItem, Paper, TextField, Typography, CircularProgress, Avatar, Divider } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import HistoryIcon from "@mui/icons-material/History"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import PersonIcon from "@mui/icons-material/Person"

const BotIcon = ({ size = 32 }) => (
    <Box sx={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
        <SmartToyIcon sx={{ fontSize: size * 0.55, color: "#fff" }} />
    </Box>
)

export default function Learn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categories, subCategories } = useSelector((state) => state.category)
    const { history, loading } = useSelector((state) => state.prompt)
    const { currentUser } = useSelector((state) => state.user)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedSubCategory, setSelectedSubCategory] = useState("")
    const [promptText, setPromptText] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => { dispatch(fetchCategories()) }, [dispatch])

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
        setSelectedSubCategory("")
        dispatch(fetchSubCategories(e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!promptText || !selectedSubCategory) return
        const userMsg = { role: "user", text: promptText }
        setMessages(prev => [...prev, userMsg])
        setPromptText("")
        const result = await dispatch(sendPrompt({
            user_id: currentUser._id,
            category_id: selectedCategory,
            sub_category_id: selectedSubCategory,
            prompt: promptText
        }))
        if (result.payload?.response) {
            setMessages(prev => [...prev, { role: "bot", text: result.payload.response }])
        }
    }

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" py={4} px={3}>
            <Box width="100%" maxWidth={680} display="flex" flexDirection="column" height="100%">

                <Box display="flex" flexDirection="column" alignItems="center" gap={1} mb={3}>
                    <BotIcon size={48} />
                    <Typography variant="h6" fontWeight={700} color="#fff">Lexi</Typography>
                    <Button variant="outlined" size="small" startIcon={<HistoryIcon />}
                        onClick={() => navigate("/history")}
                        sx={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)",
                            "&:hover": { borderColor: "#a78bfa", color: "#a78bfa" } }}>
                        My History
                    </Button>
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />

                <Box flex={1} mb={3} display="flex" flexDirection="column" gap={2} minHeight={300}>
                    {messages.length === 0 && (
                        <Box display="flex" gap={1.5} alignItems="flex-start">
                            <BotIcon size={34} />
                            <Paper sx={{
                                p: 2, borderRadius: "4px 18px 18px 18px", maxWidth: "75%",
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                                <Typography fontSize={14} sx={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
                                    Hi {currentUser?.name?.split(" ")[0]} 👋 I'm <strong>Lexi</strong>!
                                    <br />Select a topic and ask me anything.
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    {messages.map((msg, i) => (
                        <Box key={i} display="flex" gap={1.5} alignItems="flex-start"
                            justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}
                            sx={{ animation: "fadeIn 0.3s ease forwards" }}>
                            {msg.role === "bot" && <BotIcon size={34} />}
                            <Paper sx={{
                                p: 2, maxWidth: "75%",
                                borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                                background: msg.role === "user"
                                    ? "linear-gradient(135deg, #a78bfa, #60a5fa)"
                                    : "rgba(255,255,255,0.06)",
                                border: msg.role === "bot" ? "1px solid rgba(255,255,255,0.1)" : "none"
                            }}>
                                <Typography fontSize={14} lineHeight={1.8}
                                    sx={{ color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.85)" }}>
                                    {msg.text}
                                </Typography>
                            </Paper>
                            {msg.role === "user" && (
                                <Avatar sx={{ width: 34, height: 34, background: "rgba(255,255,255,0.1)", flexShrink: 0 }}>
                                    <PersonIcon sx={{ fontSize: 18 }} />
                                </Avatar>
                            )}
                        </Box>
                    ))}

                    {loading && (
                        <Box display="flex" gap={1.5} alignItems="center">
                            <BotIcon size={34} />
                            <Paper sx={{ p: 2, borderRadius: "4px 18px 18px 18px",
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <Box display="flex" gap={0.5} alignItems="center">
                                    {[0,1,2].map(i => (
                                        <Box key={i} sx={{
                                            width: 7, height: 7, borderRadius: "50%", background: "#a78bfa",
                                            animation: `typing 1.2s ease-in-out ${i * 0.2}s infinite`
                                        }} />
                                    ))}
                                </Box>
                            </Paper>
                        </Box>
                    )}
                </Box>

                <Paper sx={{
                    p: 2.5, borderRadius: 4,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)"
                }}>
                    <Box display="flex" gap={2} mb={2}>
                        <TextField select fullWidth label="Category" size="small"
                            value={selectedCategory} onChange={handleCategoryChange}
                            InputLabelProps={{ style: { color: "rgba(255,255,255,0.5)" } }}
                            sx={{ "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.15)" }, "&:hover fieldset": { borderColor: "#a78bfa" } } }}>
                            {categories.map((c) => (
                                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                            ))}
                        </TextField>
                        <TextField select fullWidth label="Sub Category" size="small"
                            value={selectedSubCategory}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                            disabled={!selectedCategory}
                            InputLabelProps={{ style: { color: "rgba(255,255,255,0.5)" } }}
                            sx={{ "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.15)" }, "&:hover fieldset": { borderColor: "#a78bfa" } } }}>
                            {subCategories.map((s) => (
                                <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" gap={1.5}>
                            <TextField fullWidth placeholder="Ask Lexi anything..." size="small"
                                value={promptText} onChange={(e) => setPromptText(e.target.value)}
                                InputProps={{ style: { color: "#fff" } }}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, "& fieldset": { borderColor: "rgba(255,255,255,0.15)" }, "&:hover fieldset": { borderColor: "#a78bfa" }, "& input::placeholder": { color: "rgba(255,255,255,0.3)" } } }} />
                            <Button variant="contained" type="submit"
                                disabled={loading || !promptText || !selectedSubCategory}
                                sx={{
                                    minWidth: 52, borderRadius: 3, px: 2,
                                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                                    boxShadow: "0 4px 16px rgba(167,139,250,0.3)",
                                    "&:hover": { transform: "scale(1.05)" }, transition: "all 0.2s"
                                }}>
                                {loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    )
}
