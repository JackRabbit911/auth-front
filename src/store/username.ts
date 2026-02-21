import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UserNameStore = {
    name: string;
}

const initialState: UserNameStore = {
  name: '',
}

export const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUsername: (store, action: PayloadAction<string>) => {
            store.name = action.payload
        }
    }
})

export const { setUsername } = usernameSlice.actions
export default usernameSlice.reducer
