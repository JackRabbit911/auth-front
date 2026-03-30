import { configureStore } from "@reduxjs/toolkit"

import commonReducer from "./common"
import refererReducer from "./referer"
import usernameReducer from "./username"
import translateReducer from "common/i18n/translate"
import csrfReducer from "./csrf"

export const store = configureStore({
    reducer: {
        common: commonReducer,
        referer: refererReducer,
        username: usernameReducer,
        translate: translateReducer,
        csrf: csrfReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
