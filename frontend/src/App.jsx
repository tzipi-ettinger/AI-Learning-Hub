import { Routes, Route } from "react-router-dom"
import Register from "./components/Register"
import Learn from "./components/Learn"
import History from "./components/History"
import Admin from "./components/Admin"
import "./App.css"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}

export default App
