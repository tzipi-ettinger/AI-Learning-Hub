/** AdminSlice - manages data for the admin dashboard (all users and all prompts) */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllUsers, getAllHistory } from "../api/api"

/** Fetches all registered users */
export const fetchAllUsers = createAsyncThunk("admin/fetchUsers", async () => {
    const res = await getAllUsers()
    return res.data
})

/** Fetches all prompts across all users */
export const fetchAllHistory = createAsyncThunk("admin/fetchHistory", async () => {
    const res = await getAllHistory()
    return res.data
})

const AdminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        history: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchAllHistory.fulfilled, (state, action) => {
                state.history = action.payload
            })
    }
})

export default AdminSlice.reducer
