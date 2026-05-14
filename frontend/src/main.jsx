import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/index"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import App from "./App.jsx"
import "./index.css"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#38bdf8" },
        secondary: { main: "#7dd3fc" },
        background: { default: "#0a0f1e", paper: "rgba(255,255,255,0.04)" },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: "'Segoe UI', sans-serif" },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "html, body, #root": {
                    minHeight: "100vh",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
                    backgroundAttachment: "fixed",
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: "#0f1e35 !important",
                    border: "1px solid rgba(56,189,248,0.2)",
                    backdropFilter: "none",
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: "#0f1e35 !important",
                    border: "1px solid rgba(56,189,248,0.2)",
                }
            }
        }
    }
})

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
