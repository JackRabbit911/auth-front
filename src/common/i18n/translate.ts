import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import ajax from 'common/ajax';
import { getTranslateUri } from 'common/constants';
import type { RootState } from 'store';

type TranslateData = {
    [key: string]: string | null;
}

type TranslateStore = {
    data: TranslateData;
}

const initialState: TranslateStore = {
    data: {},
}

export const getTranslateThunk = createAsyncThunk(
    'getTranslateThunk',
    async (translateKeys: string[], thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const translate = state.translate.data
        const keys = Object.keys(translate)
        const diff = translateKeys.filter(x => !keys.includes(x));

        if (diff.length > 0) {
            const response = await ajax.post(getTranslateUri, { filter: diff })
            const data = response.data
            const result = data.result
            
            return result
        }
    }
)

const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTranslateThunk.fulfilled, (state, action: PayloadAction<TranslateData>) => {
            state.data = {...state.data, ...action.payload}
        })
    },
})

export default translateSlice.reducer
