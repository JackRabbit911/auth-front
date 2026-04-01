import { configureStore } from "@reduxjs/toolkit"

import commonReducer from "./common"
import refererReducer from "./referer"
import usernameReducer from "./username"
import csrfReducer from "./csrf"

export const store = configureStore({
    reducer: {
        common: commonReducer,
        referer: refererReducer,
        username: usernameReducer,
        csrf: csrfReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
