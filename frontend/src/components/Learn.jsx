import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchCategories, fetchSubCategories } from "../store/CategorySlice"
import { sendPrompt } from "../store/SubCategorySlice"
import { Box, Button, MenuItem, Paper, TextField, Typography, CircularProgress, Avatar } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import HistoryIcon from "@mui/icons-material/History"
import PersonIcon from "@mui/icons-material/Person"
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount"
import BotSVG from "./BotSVG"

/** Bot icon with glow effect */
const BotIcon = ({ size = 34 }) => (
    <Box sx={{ flexShrink: 0, filter: "drop-shadow(0 0 6px rgba(167,139,250,0.5))" }}>
        <BotSVG size={size} />
    </Box>
)

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

    /** Sends prompt to AI and adds response to chat */
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

        if (result.payload?.response) {
            setMessages(prev => [...prev, { role: "bot", text: result.payload.response }])
        }
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "row", overflow: "hidden" }}>

            {/* Left panel — controls */}
            <Box sx={{ width: 450, display: "flex", flexDirection: "column", p: 4, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                    <BotIcon size={50} />
                    <Box>
                        <Typography variant="h4" fontWeight={800} color="#fff">Lexi</Typography>
                        <Typography variant="caption" color="rgba(255,255,255,0.4)">Learning Assistant</Typography>
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<SwitchAccountIcon />}
                    onClick={() => navigate("/")}
                    sx={{ mb: 2, borderRadius: 2, borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", textTransform: "none" }}
                >
                    Switch User
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<HistoryIcon />}
                    onClick={() => navigate("/history")}
                    sx={{ mb: 4, borderRadius: 2, borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", textTransform: "none" }}
                >
                    View History
                </Button>

                <Paper sx={{ p: 3, borderRadius: 6, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
                    <Box display="flex" flexDirection="column">
                        <TextField select fullWidth label="Category"
                            value={selectedCategory} onChange={handleCategoryChange}
                            InputLabelProps={{ style: { color: "rgba(255,255,255,0.4)" } }}
                            sx={{ mb: 3, "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }}>
                            {categories.map((c) => (
                                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                            ))}
                        </TextField>

                        <TextField select fullWidth label="Sub-Category"
                            value={selectedSubCategory}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                            disabled={!selectedCategory}
                            InputLabelProps={{ style: { color: "rgba(255,255,255,0.4)" } }}
                            sx={{ mb: 4, "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }}>
                            {subCategories.map((s) => (
                                <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
                            ))}
                        </TextField>

                        <form onSubmit={handleSubmit}>
                            <Box display="flex" flexDirection="column">
                                <TextField
                                    fullWidth multiline rows={3}
                                    placeholder="Type here..."
                                    value={promptText} onChange={(e) => setPromptText(e.target.value)}
                                    InputProps={{ style: { color: "#fff" } }}
                                    sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3, background: "rgba(0,0,0,0.2)", "& fieldset": { borderColor: "transparent" } } }}
                                />
                                <Button
                                    fullWidth variant="contained" type="submit"
                                    disabled={loading || !promptText || !selectedSubCategory}
                                    sx={{ height: 50, borderRadius: 3, background: "linear-gradient(135deg, #a78bfa, #60a5fa)" }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Paper>
            </Box>

            {/* Right panel — chat */}
            <Box sx={{ flex: 1, p: 6, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
                {messages.map((msg, i) => (
                    <Box key={i} display="flex" gap={3} alignItems="flex-start" sx={{ animation: "fadeIn 0.3s ease" }}>
                        {msg.role === "user" ? (
                            <Avatar sx={{ width: 40, height: 40, bgcolor: "#60a5fa" }}><PersonIcon /></Avatar>
                        ) : (
                            <BotIcon size={40} />
                        )}
                        <Box flex={1}>
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>
                                {msg.role === "user" ? "YOU" : "LEXI"}
                            </Typography>
                            <Paper sx={{
                                p: 2.5, mt: 1,
                                borderRadius: "0 15px 15px 15px",
                                background: msg.role === "user" ? "rgba(255,255,255,0.05)" : "rgba(167,139,250,0.1)",
                                color: "#fff", border: "1px solid rgba(255,255,255,0.05)",
                                maxWidth: "80%"
                            }}>
                                <Typography fontSize={16} lineHeight={1.6}>{msg.text}</Typography>
                            </Paper>
                        </Box>
                    </Box>
                ))}

                {loading && (
                    <Box display="flex" gap={3} alignItems="flex-start">
                        <BotIcon size={40} />
                        <Box>
                            <Typography variant="caption" sx={{ color: "rgba(167,139,250,0.5)", fontWeight: 700, mb: 1 }}>LEXI IS THINKING...</Typography>
                            <Box sx={{ mt: 1 }}>
                                <CircularProgress size={20} sx={{ color: "#a78bfa" }} />
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
