import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { registerUser } from "../api/api"

export const addUser = createAsyncThunk("user/addUser", async (userData) => {
    const res = await registerUser(userData)
    return res.data
})

const UserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null
            localStorage.removeItem("currentUser")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => { state.loading = true })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload
                localStorage.setItem("currentUser", JSON.stringify(action.payload))
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { logout } = UserSlice.actions
export default UserSlice.reducer
