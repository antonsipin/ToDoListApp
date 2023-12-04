import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TasksState } from '../types/TasksState'
import Task from '../types/Task'
import * as api from '../api'
import { DELETE_TASK, RESOLVE_TASK, GET_TASKS, CREATE_TASK, UPDATE_TASK } from './types'
import { sortByName } from '../utils/sort'

export const initialTasksState: TasksState = {
    tasks: [],
    info: false,
    error: ''
}

export const getTasks = createAsyncThunk(GET_TASKS, (accessToken: string) => api.getTasks(accessToken))

export const resolveTask = createAsyncThunk(RESOLVE_TASK, ({
    id,
    status, 
    accessToken
} : {
    id: string,
    status: boolean, 
    accessToken: string
}) => api.resolveTask(id, status, accessToken))

export const deleteTask = createAsyncThunk(DELETE_TASK, ({
    id, 
    accessToken
} : {
    id: string, 
    accessToken: string
}) => api.deleteTask(id, accessToken))

export const createTask = createAsyncThunk(CREATE_TASK, ({
    taskName, 
    taskDescription, 
    accessToken
}: {
    taskName: string, 
    taskDescription: string, 
    accessToken: string
}) => api.addTask(taskName, taskDescription, accessToken))

export const updateTask = createAsyncThunk(UPDATE_TASK, ({
    taskId: id, 
    accessToken, 
    updateInput: {taskName, taskDescription}
}: {
    taskId: string, 
    accessToken: string, 
    updateInput: {
        taskName: string, 
        taskDescription: string
    }
}) => api.updateTask(id, taskName, taskDescription, accessToken))

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        hideInput(state: TasksState, action: PayloadAction<string>) {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload) {
                    task.isUpdate = !task.isUpdate
                } 
                return task
            })
        },
        setError(state: TasksState, action: PayloadAction<string>) {
            state.error = action.payload || initialTasksState.error
        },
        setInfo(state: TasksState, action: PayloadAction<boolean>) {
            state.info = action.payload || initialTasksState.info
        },
        setUserTasks(state: TasksState, action: PayloadAction<Task[]>) {
            state.tasks = action.payload || initialTasksState.tasks
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getTasks.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        if (action.payload.error === 'Token Expired') {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = action.payload.error
                        }
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = action.payload.data.sort(sortByName())
                        state.error = ''
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                resolveTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        if (action.payload.error === 'Token Expired') {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = action.payload.error
                        }
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = state.tasks.map((task) => {
                            if (Number(task.id) === Number(action.payload.data?.id)) {
                                task.status = !task.status
                            }
                            return task
                        })
                    } else {
                        state.error = 'Something went wrong'
                    }
                } 
            )
            .addCase(
                deleteTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        if (action.payload.error.includes('Token Expired')) {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = action.payload.error
                        }
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = state.tasks.filter((task) => Number(task.id) !== Number(action.payload.data?.id))
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                createTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        if (action.payload.error.includes('Token Expired')) {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = action.payload.error
                        }
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = [...state.tasks, action.payload.data].sort(sortByName())
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                updateTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        if (action.payload.error.includes('Token Expired')) {
                            state.error = 'Please Log In!'
                        } else {
                            state.error = action.payload.error
                        }
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        const oldTask = state.tasks.find((task) => Number(task.id) === Number(action.payload.data?.id))
                        Object.assign(oldTask as Task, action.payload.data)
                        state.tasks = state.tasks.sort(sortByName())
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
    }
})

export const { setInfo, setError, hideInput, setUserTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer