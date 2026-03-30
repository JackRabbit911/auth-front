import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ajax from "common/ajax";
import { confirmUri, registerUri } from "common/constants";
import type { RegisterData, ServerValidationError } from "Register/schema";

type Result = {
    success: boolean;
    result?: boolean;
    error?: ServerValidationError[];
}

export const registerThunk = createAsyncThunk<Result, RegisterData, { rejectValue: number | undefined }>(
    'registerThunk',
    async (validData, { rejectWithValue }) => {
        try {
            const response = await ajax.post(registerUri, validData)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.status)
            }
        }
    }
)

export const confirmCodeThunk = createAsyncThunk<Result, string, { rejectValue: number | undefined }>(
    'confirmCodeThunk',
    async (code, { rejectWithValue }) => {
        try {
            const uri = [confirmUri, code].join('/')
            const response = await ajax.get(uri)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.status)
            }
        }
    }
)
