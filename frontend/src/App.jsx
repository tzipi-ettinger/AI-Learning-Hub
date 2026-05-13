/** App - defines client-side routing for all pages */
import { Routes, Route } from "react-router-dom"
import Register from "./components/Register"
import Learn from "./components/Learn"
import History from "./components/History"
import Admin from "./components/Admin"
import "./App.css"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />         {/* Login / Register page */}
            <Route path="/learn" element={<Learn />} />       {/* AI chat learning page */}
            <Route path="/history" element={<History />} />   {/* User learning history */}
            <Route path="/admin" element={<Admin />} />       {/* Admin dashboard */}
        </Routes>
    )
}

export default App
