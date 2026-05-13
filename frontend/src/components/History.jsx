import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchHistory } from "../store/SubCategorySlice"
import { Box, Button, Chip, Paper, Typography, Container, Grid, Divider } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import BotSVG from "./BotSVG"

const BotIcon = ({ size = 32 }) => (
    <Box sx={{ flexShrink: 0, filter: "drop-shadow(0 0 6px rgba(167,139,250,0.4))" }}>
        <BotSVG size={size} />
    </Box>
)

export default function History() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { history } = useSelector((state) => state.prompt)
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        if (currentUser) dispatch(fetchHistory(currentUser._id))
    }, [dispatch, currentUser])

    return (
        <Box minHeight="100vh" py={8}>
            <Container maxWidth="lg">
                
                <Box display="flex" flexDirection="column" alignItems="center" mb={8} sx={{ animation: "fadeIn 0.6s ease-out" }}>
                    <BotIcon size={60} />
                    <Typography variant="h3" fontWeight={800} color="#fff" sx={{ mt: 2, letterSpacing: -1 }}>
                        Learning Journey
                    </Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.5)" sx={{ mb: 4 }}>
                        Everything you've explored with Lexi
                    </Typography>
                    
                    <Box display="flex" gap={2} alignItems="center">
                        <Chip 
                            label={`${history.length} Sessions`} 
                            sx={{ 
                                bgcolor: "rgba(167,139,250,0.1)", 
                                color: "#a78bfa", 
                                fontWeight: 700,
                                px: 2, py: 2,
                                border: "1px solid rgba(167,139,250,0.2)"
                            }} 
                        />
                        <Button 
                            variant="outlined"
                            startIcon={<ArrowBackIcon />} 
                            onClick={() => navigate("/learn")}
                            sx={{ 
                                borderRadius: 3,
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "rgba(255,255,255,0.7)",
                                "&:hover": { borderColor: "#a78bfa", color: "#a78bfa", bgcolor: "rgba(167,139,250,0.05)" }
                            }}
                        >
                            Back to Learning
                        </Button>
                    </Box>
                </Box>

                {history.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <Typography variant="h5" color="rgba(255,255,255,0.2)">
                            Your history is currently empty.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {history.map((item, i) => (
                            <Grid item xs={12} md={6} key={item._id}>
                                <Paper sx={{
                                    height: '100%',
                                    p: 4,
                                    borderRadius: 5,
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    backdropFilter: "blur(10px)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                    transition: "all 0.3s ease",
                                    animation: `fadeInUp ${0.4 + i * 0.1}s ease forwards`,
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        background: "rgba(255,255,255,0.05)",
                                        borderColor: "rgba(167, 139, 250, 0.3)"
                                    }
                                }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box display="flex" gap={1}>
                                            <Chip label={item.category_id?.name} size="small" sx={{ bgcolor: "#3b82f6", color: "#fff", fontWeight: 600 }} />
                                            <Chip label={item.sub_category_id?.name} size="small" sx={{ bgcolor: "#8b5cf6", color: "#fff", fontWeight: 600 }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 14 }} />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column" gap={2}>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 700, textTransform: 'uppercase' }}>Your Question</Typography>
                                            <Typography variant="body2" sx={{ color: "#fff", mt: 0.5, lineHeight: 1.6 }}>
                                                {item.prompt}
                                            </Typography>
                                        </Box>
                                        
                                        <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
                                        
                                        <Box>
                                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                <SmartToyIcon sx={{ fontSize: 16, color: "#60a5fa" }} />
                                                <Typography variant="caption" sx={{ color: "#60a5fa", fontWeight: 700, textTransform: 'uppercase' }}>Lexi's Insight</Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                                                {item.response}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}