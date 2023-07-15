import { configureStore } from "@reduxjs/toolkit";
import modalSlice from './modalReducer'
import userSlice from './userReducer'

export const store = configureStore({
    reducer: {
        modals: modalSlice,
        user: userSlice
    },
})