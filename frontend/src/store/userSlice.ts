import { SignInUser } from './../types/SignInUser'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { SIGN_IN, LOGOUT, SIGN_UP } from './types'
import * as api from '../api'
import { UserState } from '../types/UserState'
import { User } from '../types/User'
import { ResponseUser } from '../types/ResponseUser'

export const initialUserState: UserState = {
    user: {
        name: '',
        accessToken: '',
        refreshToken: ''
    },
    error: ''
}

export const login = createAsyncThunk(SIGN_IN, async (user: SignInUser) => await api.signIn(user))

export const logout = createAsyncThunk(LOGOUT, async (accessToken: string) => await api.logout(accessToken))

export const register = createAsyncThunk(SIGN_UP, async (user: User) => await api.signUp(user))

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<ResponseUser>) {
            state.user = action.payload
        },
        setError(state: UserState, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                register.fulfilled,
                (state, action) => {
                    if (action.payload.data) {
                        state.user = initialUserState.user
                        state.error = initialUserState.error
                    }
                }
            )
            .addCase(
                register.rejected,
                (state, action) => {
                    if (action.error && action.error.message === 'Token Expired') {
                        state.error = initialUserState.error
                    } else if (action.error && action.error.message === 'The user already exists') {
                        state.error = action.error.message
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                login.fulfilled,
                (state, action) => {
                    if (action.payload.data) {
                        state.user = action.payload.data
                        state.error = initialUserState.error
                    }
                    
                }
            )
            .addCase(
                login.rejected,
                (state, action) => {
                    if (action.error && action.error.message === 'Token Expired') {
                        state.error = initialUserState.error 
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                logout.fulfilled,
                (state) => {
                    state.user = initialUserState.user
                    state.error = initialUserState.error
                }
            )
            .addCase(
                logout.rejected,
                (state, action) => {
                    if (action.error && action.error.message === 'Token Expired') {
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