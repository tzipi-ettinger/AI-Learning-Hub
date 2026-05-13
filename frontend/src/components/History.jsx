import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchHistory } from "../store/SubCategorySlice"
import { Box, Button, Chip, Paper, Typography, Avatar, Divider } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import BotSVG from "./BotSVG"

const BotImg = ({ size = 32 }) => <BotSVG size={size} />

export default function History() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { history } = useSelector((state) => state.prompt)
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        if (currentUser) dispatch(fetchHistory(currentUser._id))
    }, [dispatch, currentUser])

    return (
        <Box minHeight="100vh" py={6} px={3}>
            <Box maxWidth={620} mx="auto" sx={{ animation: "fadeIn 0.5s ease forwards" }}>

                <Box display="flex" flexDirection="column" alignItems="center" gap={1.5} mb={5}>
                    <BotImg size={44} />
                    <Typography variant="h6" fontWeight={700} color="#fff">Learning History</Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip label={`${history.length} sessions`} size="small"
                            sx={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" }} />
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/learn")}
                            sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "#a78bfa" } }}>
                            Back
                        </Button>
                    </Box>
                </Box>

                {history.length === 0 ? (
                    <Box textAlign="center" mt={10}>
                        <BotImg size={64} />
                        <Typography sx={{ color: "rgba(255,255,255,0.4)", mt: 2 }}>No sessions yet. Go learn something!</Typography>
                        <Button variant="outlined" sx={{ mt: 3, borderColor: "#a78bfa", color: "#a78bfa" }}
                            onClick={() => navigate("/learn")}>Start Learning</Button>
                    </Box>
                ) : (
                    history.map((item, i) => (
                        <Box key={item._id} sx={{ mb: 4, p: 3, borderRadius: 3, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", animation: `fadeIn ${0.3 + i * 0.1}s ease forwards` }}>
                            <Box display="flex" gap={1} mb={2.5} alignItems="center" flexWrap="wrap">
                                <Chip label={item.category_id?.name} size="small" color="primary" />
                                <Chip label={item.sub_category_id?.name} size="small" color="secondary" />
                                <Box sx={{ flexGrow: 1 }} />
                                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Paper sx={{ p: 2.5, mb: 2, borderRadius: 2,
                                background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.2))",
                                border: "1px solid rgba(167,139,250,0.25)" }}>
                                <Typography variant="caption" sx={{ color: "#a78bfa", mb: 1, display: "block", fontWeight: 600 }}>You asked:</Typography>
                                <Typography fontSize={14} color="rgba(255,255,255,0.9)" lineHeight={1.7}>{item.prompt}</Typography>
                            </Paper>
                            <Paper sx={{ p: 2.5, borderRadius: 2,
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <SmartToyIcon sx={{ fontSize: 13, color: "#a78bfa" }} />
                                    <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 600 }}>Lexi answered:</Typography>
                                </Box>
                                <Typography fontSize={14} lineHeight={1.9} sx={{ color: "rgba(255,255,255,0.8)" }}>
                                    {item.response}
                                </Typography>
                            </Paper>
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    )
}
