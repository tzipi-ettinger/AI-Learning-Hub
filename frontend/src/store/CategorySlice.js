/** CategorySlice - manages categories and subcategories fetched from the API */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getCategories, getSubCategories } from "../api/api"

/** Fetches all categories from the backend */
export const fetchCategories = createAsyncThunk("category/fetchAll", async () => {
    const res = await getCategories()
    return res.data
})

/** Fetches subcategories for a selected category */
export const fetchSubCategories = createAsyncThunk("category/fetchSub", async (categoryId) => {
    const res = await getSubCategories(categoryId)
    return res.data
})

const CategorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        subCategories: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.subCategories = action.payload
            })
    }
})

export default CategorySlice.reducer
