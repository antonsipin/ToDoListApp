import { SignInUser } from './../types/SignInUser'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { SIGN_IN, LOGOUT, SIGN_UP } from './types'
import * as api from '../api'
import { SignInUserState } from '../types/SignInUserState'
import { User } from '../types/User'
import { ResponseUser } from '../types/ResponseUser'

export const initialUserState: SignInUserState = {
    user: {
        name: '',
        email: '',
    },
    error: ''
}

export const login = createAsyncThunk(SIGN_IN, async (user: SignInUser) => await api.signIn(user))

export const logout = createAsyncThunk(LOGOUT, async () => await  api.logout())

export const register = createAsyncThunk(SIGN_UP, async (user: User) => await api.signUp(user))

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state: SignInUserState, action: PayloadAction<ResponseUser>) {
            state.user = action.payload
        },
        setError(state: SignInUserState, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                register.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.user = initialUserState.user
                        state.error = initialUserState.error
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                login.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.user = action.payload.data
                        state.error = initialUserState.error
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                logout.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully') {
                        state.user = initialUserState.user
                        state.error = initialUserState.error
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
    },
})

export const { setUser, setError } = userSlice.actions
export const userReducer = userSlice.reducer