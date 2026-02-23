import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TranslateStore = {
    [key: string]: string | null;
}

const initialState: TranslateStore = {
    'Welcome ;)': 'Заходи ;)'
}

export const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {
        setTranslate: (state, action: PayloadAction<TranslateStore>) => {
            Object.assign(state, action.payload)
        }
    },
})

export const { setTranslate } = translateSlice.actions
export default translateSlice.reducer
