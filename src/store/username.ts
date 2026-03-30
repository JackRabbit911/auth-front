import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import ajax from 'common/ajax';
import { emailCheckUri } from 'common/constants';
import type { Email, ServerValidationError } from 'Restore/schema';

type Result = {
    success: boolean;
    result?: string;
    error?: ServerValidationError[];
}

type UserNameStore = {
    name?: string;
}

const initialState: UserNameStore = {
    name: undefined,
}

export const emailCheckThunk = createAsyncThunk<Result, Email, { rejectValue: number | undefined }>(
    'emailCheckThunk',
    async (validData: Email, { rejectWithValue }) => {
        try {
            const response = await ajax.post(emailCheckUri, validData)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.status)
            }
        }
    }
)

const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.name = action?.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(emailCheckThunk.fulfilled, (state, action) => {
                state.name = action?.payload.result
            })
    }
})

export const { setUsername } = usernameSlice.actions
export default usernameSlice.reducer
