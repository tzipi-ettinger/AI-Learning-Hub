import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchCategories, fetchSubCategories } from "../store/CategorySlice"
import { sendPrompt } from "../store/SubCategorySlice"
import { Box, Button, MenuItem, Paper, TextField, Typography, CircularProgress, Avatar, Divider } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import HistoryIcon from "@mui/icons-material/History"
import PersonIcon from "@mui/icons-material/Person"
import BotSVG from "./BotSVG"

const BotImg = ({ size = 34 }) => <BotSVG size={size} />

export default function Learn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categories, subCategories } = useSelector((state) => state.category)
    const { loading } = useSelector((state) => state.prompt)
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
        setMessages(prev => [...prev, { role: "user", text: promptText }])
        setPromptText("")
        const result = await dispatch(sendPrompt({
            user_id: currentUser._id,
            category_id: selectedCategory,
            sub_category_id: selectedSubCategory,
            prompt: promptText
        }))
        if (result.payload?.response)
            setMessages(prev => [...prev, { role: "bot", text: result.payload.response }])
    }

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
            "&:hover fieldset": { borderColor: "#a78bfa" }
        }
    }

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" py={4} px={3}>
            <Box width="100%" maxWidth={560}>

                {/* Header */}
                <Box display="flex" alignItems="center" mb={3}>
                    <BotImg size={44} />
                    <Typography variant="h6" fontWeight={700} color="#fff" ml={1.5}>Lexi</Typography>
                    <Box flex={1} />
                    <Button variant="outlined" size="small" startIcon={<HistoryIcon />}
                        onClick={() => navigate("/history")}
                        sx={{ mr: 2, borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)",
                            "&:hover": { borderColor: "#a78bfa", color: "#a78bfa" } }}>
                        My History
                    </Button>
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />

                {/* Chat area */}
                <Box mb={3} display="flex" flexDirection="column" gap={2} minHeight={280}>
                    {messages.length === 0 && (
                        <Box display="flex" gap={1.5} alignItems="flex-start">
                            <BotImg size={34} />
                            <Paper sx={{ p: 2, borderRadius: "4px 18px 18px 18px", maxWidth: "80%",
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
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
                            {msg.role === "bot" && <BotImg size={34} />}
                            <Paper sx={{
                                p: 2, maxWidth: "78%",
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
                            <BotImg size={34} />
                            <Paper sx={{ p: 2, borderRadius: "4px 18px 18px 18px",
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <Box display="flex" gap={0.5}>
                                    {[0,1,2].map(i => (
                                        <Box key={i} sx={{ width: 7, height: 7, borderRadius: "50%", background: "#a78bfa",
                                            animation: `typing 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                                    ))}
                                </Box>
                            </Paper>
                        </Box>
                    )}
                </Box>

                {/* Input area */}
                <Paper sx={{ p: 2.5, borderRadius: 4, background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
                    <TextField select fullWidth label="Category" size="small" sx={{ mb: 2, ...fieldSx }}
                        value={selectedCategory} onChange={handleCategoryChange}
                        InputLabelProps={{ style: { color: "rgba(255,255,255,0.5)" } }}>
                        {categories.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                    </TextField>
                    <TextField select fullWidth label="Sub Category" size="small" sx={{ mb: 2, ...fieldSx }}
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        disabled={!selectedCategory}
                        InputLabelProps={{ style: { color: "rgba(255,255,255,0.5)" } }}>
                        {subCategories.map((s) => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
                    </TextField>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" gap={1.5}>
                            <TextField fullWidth placeholder="Ask Lexi anything..." size="small"
                                value={promptText} onChange={(e) => setPromptText(e.target.value)}
                                InputProps={{ style: { color: "#fff" } }}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,
                                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                                    "&:hover fieldset": { borderColor: "#a78bfa" },
                                    "& input::placeholder": { color: "rgba(255,255,255,0.3)" } } }} />
                            <Button variant="contained" type="submit"
                                disabled={loading || !promptText || !selectedSubCategory}
                                sx={{ minWidth: 52, borderRadius: 3, px: 2,
                                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                                    "&:hover": { transform: "scale(1.05)" }, transition: "all 0.2s" }}>
                                {loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    )
}
