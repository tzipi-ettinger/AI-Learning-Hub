import axios from "axios"

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" })

export const registerUser = (data) => api.post("/users", data)
export const getCategories = () => api.get("/categories")
export const getSubCategories = (categoryId) => api.get(`/categories/${categoryId}/subcategories`)
export const submitPrompt = (data) => api.post("/prompts", data)
export const getUserHistory = (userId) => api.get(`/prompts/${userId}`)
export const getAllUsers = () => api.get("/admin/users")
export const getAllHistory = () => api.get("/admin/history")
