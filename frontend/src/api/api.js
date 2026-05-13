/** Axios instance configured with base API URL from environment variables */
import axios from "axios"

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" })

/** Register a new user or login if phone already exists */
export const registerUser = (data) => api.post("/users", data)

/** Fetch all available categories */
export const getCategories = () => api.get("/categories")

/** Fetch subcategories for a given category ID */
export const getSubCategories = (categoryId) => api.get(`/categories/${categoryId}/subcategories`)

/** Submit a prompt to the AI and save the response */
export const submitPrompt = (data) => api.post("/prompts", data)

/** Fetch learning history for a specific user */
export const getUserHistory = (userId) => api.get(`/prompts/${userId}`)

/** Admin: fetch all registered users */
export const getAllUsers = () => api.get("/admin/users")

/** Admin: fetch all prompts across all users */
export const getAllHistory = () => api.get("/admin/history")
