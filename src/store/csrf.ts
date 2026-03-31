import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import ajax from "common/ajax";
import type { ApiResponse } from "common/ajax/types";
import { passwordCheckUri } from "common/constants";

type CsrfStore = {
    data: string | boolean;
}

type Result = ApiResponse<string>
type Params = {
    id: string | undefined;
    code: string | undefined;
}

const initialState: CsrfStore = {data: ''}

export const getCsrfThunk = createAsyncThunk<Result, Params, { rejectValue: number | undefined }>(
    'getCsrfThunk',
    async ({id: id, code: code}) => {
        const uri = [passwordCheckUri, id, code].join('/')
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
