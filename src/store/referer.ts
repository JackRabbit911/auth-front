import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type RefererStore = {
    referer: string;
}

const initialState: RefererStore = {
  referer: '/',
}

export const refererSlice = createSlice({
    name: 'referer',
    initialState,
    reducers: {
        setReferer: (store, action: PayloadAction<string>) => {
            store.referer = action.payload
        }
    }
})

export const { setReferer } = refererSlice.actions
export default refererSlice.reducer
