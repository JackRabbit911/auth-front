import { createSlice } from "@reduxjs/toolkit";

import { authThunk } from "./auth";
import { getCsrfThunk } from "./csrf";
import { emailCheckThunk } from "./username";
import { restorePswdThunk } from "store/restorePswd";
import { confirmCodeThunk, registerThunk } from "./register";

type CommonStore = {
    loading: boolean;
    error?: number;
}

const initialState: CommonStore = {
    loading: false,
    error: undefined,
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(emailCheckThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(emailCheckThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(emailCheckThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload
            })
            .addCase(authThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(authThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(authThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload
            })
            .addCase(restorePswdThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(restorePswdThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(restorePswdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload
            })
            .addCase(confirmCodeThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(confirmCodeThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(confirmCodeThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload
            })
            .addCase(getCsrfThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload
            });
    }
})

export default commonSlice.reducer
