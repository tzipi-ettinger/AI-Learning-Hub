/** Axios instance configured with base API URL from environment variables */
import axios from "axios"

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" })

/** Attach JWT token to every request if available */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

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

/** Admin: fetch all registered users with pagination */
export const getAllUsers = (page = 1) => api.get(`/admin/users?page=${page}&limit=10`)

/** Admin: fetch all prompts across all users with pagination */
export const getAllHistory = (page = 1) => api.get(`/admin/history?page=${page}&limit=10`)

/** Admin: fetch history for a specific user */
export const getUserHistoryById = (userId) => api.get(`/prompts/${userId}`)
