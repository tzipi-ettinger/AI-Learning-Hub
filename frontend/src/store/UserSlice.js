/** UserSlice - manages the currently logged-in user. Persists to localStorage */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { registerUser } from "../api/api"

/** Registers or logs in a user by phone number */
export const addUser = createAsyncThunk("user/addUser", async (userData) => {
    const res = await registerUser(userData)
    return res.data
})

const UserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null
    },
    reducers: {
        /** Clears the current user and token from state and localStorage */
        logout: (state) => {
            state.currentUser = null
            state.token = null
            localStorage.removeItem("currentUser")
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => { state.loading = true })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload.user
                state.token = action.payload.token
                localStorage.setItem("currentUser", JSON.stringify(action.payload.user))
                localStorage.setItem("token", action.payload.token)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { logout } = UserSlice.actions
export default UserSlice.reducer
