import { configureStore } from "@reduxjs/toolkit"

import refererReducer from "./referer"
import { authApi } from "common/api"
import usernameReducer from "./username"

export const store = configureStore({
    reducer: {
        referer: refererReducer,
        username: usernameReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
