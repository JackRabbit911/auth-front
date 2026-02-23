import { configureStore } from "@reduxjs/toolkit"
import refererReducer from "./referer"
import usernameReducer from "./username"
import translateReducer from "common/i18n/translate"

export const store = configureStore({
    reducer: {
        referer: refererReducer,
        username: usernameReducer,
        translate: translateReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
