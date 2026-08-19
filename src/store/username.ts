import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UserNameStore = {
    name?: string;
    code?: string;
}

const initialState: UserNameStore = {
    name: undefined,
    code: undefined,
}

const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<UserNameStore>) => {
            state.name = action?.payload.name
            state.code = action?.payload.code
        }
    },
})

export const { setUsername } = usernameSlice.actions
export default usernameSlice.reducer
