import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import ajax from "common/ajax";
// import { passwordCheckUri } from "common/constants";

type CsrfStore = {
    data: string | boolean;
}

const initialState: CsrfStore = {data: ''}

export const getCsrfThunk = createAsyncThunk(
    'getCsrfThunk',
    async (uri: string) => {
        const response = await ajax.get(uri)
        const data = response.data
        const result = data.result

        return result
    }
)

const csrfSlice = createSlice({
    name: 'csrf',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCsrfThunk.fulfilled, (state, action: PayloadAction<string>) => {
            state.data = action?.payload
        })
    }
})

export default csrfSlice.reducer
