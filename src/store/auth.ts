import { AxiosError } from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

import ajax from "common/ajax"
import { loginUri } from "common/constants"
import type { AuthData, ServerValidationError } from "Auth/schema"

type Result = {
    success: boolean;
    result: boolean;
    error: ServerValidationError[];
}

export const authThunk = createAsyncThunk<Result, AuthData, { rejectValue: number | undefined }>(
    'authThunk',
    async (validData, { rejectWithValue }) => {
        try {
            const response = await ajax.post(loginUri, validData)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.status)
            }
        }
    }
)
