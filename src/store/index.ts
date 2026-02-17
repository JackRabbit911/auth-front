import { configureStore } from "@reduxjs/toolkit";
import refererReducer from "./referer";

const store = configureStore({
    reducer: {
        referer: refererReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
