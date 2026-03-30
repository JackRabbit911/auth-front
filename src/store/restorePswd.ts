import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ajax from "common/ajax";
import { passwordSaveUri } from "common/constants";
import type { ConfirmPassword, ConfirmValidationError } from "../Restore/schema";

type Result = {
    success: boolean;
    result: boolean;
    error: ConfirmValidationError[];
}

export const restorePswdThunk = createAsyncThunk<Result, ConfirmPassword, { rejectValue: number | undefined }>(
    'restorePassword',
    async (validData, { rejectWithValue }) => {
        try {
            const response = await ajax.post(passwordSaveUri, validData)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.status)
            }
        }
    }
)
