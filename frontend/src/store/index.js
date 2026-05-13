/** Redux store - combines all slices into a single global state */
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import categoryReducer from "./CategorySlice"
import promptReducer from "./SubCategorySlice"
import adminReducer from "./AdminSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,       // current logged-in user
        category: categoryReducer, // categories and subcategories
        prompt: promptReducer,   // prompts and learning history
        admin: adminReducer      // admin dashboard data
    }
})
