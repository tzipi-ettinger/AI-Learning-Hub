import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import categoryReducer from "./CategorySlice"
import promptReducer from "./SubCategorySlice"
import adminReducer from "./AdminSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        prompt: promptReducer,
        admin: adminReducer
    }
})
