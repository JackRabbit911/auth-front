import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import ajax from "common/ajax";
import type { ApiResponse } from "common/ajax/types";

type CsrfStore = {
    data: string | boolean;
}

type Result = ApiResponse<string>

const initialState: CsrfStore = {data: ''}

export const getCsrfThunk = createAsyncThunk<Result, string, { rejectValue: number | undefined }>(
    'getCsrfThunk',
    async (uri: string) => {
        const response = await ajax.get(uri)
        return response.data
    }
)

const csrfSlice = createSlice({
    name: 'csrf',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCsrfThunk.fulfilled, (state, action: PayloadAction<Result>) => {
            state.data = action?.payload.result
        })
    }
})

export default csrfSlice.reducer
