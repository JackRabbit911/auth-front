import { configureStore } from "@reduxjs/toolkit"
import refererReducer from "./referer"
import usernameReducer from "./username"

const store = configureStore({
    reducer: {
        referer: refererReducer,
        username: usernameReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
