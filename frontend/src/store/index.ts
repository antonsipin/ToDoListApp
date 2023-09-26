import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {tasksReducer } from './tasksSlice'
import { userReducer } from './userSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user: userReducer
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>