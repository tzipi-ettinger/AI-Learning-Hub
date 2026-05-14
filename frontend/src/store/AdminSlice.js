/** AdminSlice - manages data for the admin dashboard (all users and all prompts) */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllUsers, getAllHistory } from "../api/api"

/** Fetches paginated registered users */
export const fetchAllUsers = createAsyncThunk("admin/fetchUsers", async (page = 1) => {
    const res = await getAllUsers(page)
    return res.data
})

/** Fetches paginated prompts across all users */
export const fetchAllHistory = createAsyncThunk("admin/fetchHistory", async (page = 1) => {
    const res = await getAllHistory(page)
    return res.data
})

const AdminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        totalUsers: 0,
        totalUsersPages: 1,
        usersPage: 1,
        history: [],
        totalHistory: 0,
        totalHistoryPages: 1,
        historyPage: 1,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.totalUsers = action.payload.total
                state.totalUsersPages = action.payload.totalPages
                state.usersPage = action.payload.page
            })
            .addCase(fetchAllHistory.fulfilled, (state, action) => {
                state.history = action.payload.history
                state.totalHistory = action.payload.total
                state.totalHistoryPages = action.payload.totalPages
                state.historyPage = action.payload.page
            })
    }
})

export default AdminSlice.reducer
