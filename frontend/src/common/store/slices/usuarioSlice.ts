import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../pages/usuarios/interfaces/User';

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        removeUser(state) {
            state.user = null
        }
    }
})

export default userSlice.reducer
export const { setUser, removeUser } = userSlice.actions