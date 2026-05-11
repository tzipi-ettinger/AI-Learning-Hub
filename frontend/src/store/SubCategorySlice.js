import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { submitPrompt, getUserHistory } from "../api/api"

export const sendPrompt = createAsyncThunk("prompt/send", async (promptData) => {
    const res = await submitPrompt(promptData)
    return res.data
})

export const fetchHistory = createAsyncThunk("prompt/history", async (userId) => {
    const res = await getUserHistory(userId)
    return res.data
})

const PromptSlice = createSlice({
    name: "prompt",
    initialState: {
        history: [],
        lastResponse: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendPrompt.pending, (state) => { state.loading = true })
            .addCase(sendPrompt.fulfilled, (state, action) => {
                state.loading = false
                state.lastResponse = action.payload
                state.history.unshift(action.payload)
            })
            .addCase(sendPrompt.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.history = action.payload
            })
    }
})

export default PromptSlice.reducer
