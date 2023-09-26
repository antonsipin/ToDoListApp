import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegUserState } from '../types/RegUserState'
import { RegUser } from '../types/RegUser'

export const initialUserState: RegUserState = {
    user: {
        id: '',
        name: '',
        email: '',
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        addUser(state: RegUserState, action: PayloadAction<RegUser>) {
            state.user = action.payload
        }
    }
})

export const { addUser } = userSlice.actions

export const userReducer = userSlice.reducer