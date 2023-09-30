import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TasksState } from '../types/TasksState'
import Task from '../types/Task'
import * as api from '../api'
import { DELETE_TASK, RESOLVE_TASK, GET_TASKS, CREATE_TASK, UPDATE_TASK } from './types'

export const initialTasksState: TasksState = {
    tasks: [],
    info: false,
    error: ''
}

function sortByName() {
    return (a: Task, b: Task) => a.name.localeCompare(b.name)
}

export const getTasks = createAsyncThunk(GET_TASKS, async () => {
    const response = await api.getTasks()
    return response
})

export const resolveTask = createAsyncThunk(RESOLVE_TASK, async (id: string) => {
    const response = await api.resolveTask(id)
    return response
})

export const deleteTask = createAsyncThunk(DELETE_TASK, async (id: string) => {
    const response = await api.deleteTask(id)
    return response
})

export const createTask = createAsyncThunk(CREATE_TASK, async ({taskName, taskDescription}: {taskName: string, taskDescription: string}) => {
    const response = await api.addTask(taskName, taskDescription)
    return response
})

export const updateTask = createAsyncThunk(UPDATE_TASK, async ({
    taskId: id, updateInput: {taskName, taskDescription}
}: {
    taskId: string, updateInput: {taskName: string, taskDescription: string}
}) => {
    const response = await api.updateTask(id, taskName, taskDescription)
    return response
})

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
            state.error = action.payload || ''
        },
        setInfo(state: TasksState, action: PayloadAction<boolean>) {
            state.info = action.payload || false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getTasks.fulfilled,
            (state, action) => {
                if (action.payload.result === 'Error' && action.payload.error) {
                    state.error = action.payload.error
                  } else if (action.payload.result === 'Successfully' && action.payload.data) {
                    state.tasks = action.payload.data.sort(sortByName())
                  } else {
                    state.error = 'Something went wrong'
                  }
            }
        )
        builder.addCase(
            resolveTask.fulfilled,
            (state, action) => {
                if (action.payload.result === 'Error' && action.payload.error) {
                    state.error = action.payload.error
                  } else if (action.payload.result === 'Successfully' && action.payload.data) {
                    state.tasks = state.tasks.map((task) => {
                        if (task.id === action.payload.data?.id) {
                            task.status = !task.status
                        }
                        return task
                    })
                  } else {
                    state.error = 'Something went wrong'
                  }
            } 
        )
        builder.addCase(
            deleteTask.fulfilled,
            (state, action) => {
                if (action.payload.result === 'Error' && action.payload.error) {
                    state.error = action.payload.error
                  } else if (action.payload.result === 'Successfully' && action.payload.data) {
                    state.tasks = state.tasks.filter((task) => task.id !== action.payload.data?.id)
                  } else {
                    state.error = 'Something went wrong'
                  }
            }
        )
        builder.addCase(
            createTask.fulfilled,
            (state, action) => {
                if (action.payload.result === 'Error' && action.payload.error) {
                    state.error = action.payload.error
                  } else if (action.payload.result === 'Successfully' && action.payload.data) {
                    state.tasks = [...state.tasks, action.payload.data].sort(sortByName())
                  } else {
                    state.error = 'Something went wrong'
                  }
            }
        )
        builder.addCase(
            updateTask.fulfilled,
            (state, action) => {
                if (action.payload.result === 'Error' && action.payload.error) {
                    state.error = action.payload.error
                  } else if (action.payload.result === 'Successfully' && action.payload.data) {
                    state.tasks = state.tasks.map((task) => {
                        if (task.id === action.payload.data?.id) {
                            task.name = action.payload.data.name
                            task.message = action.payload.data.message
                        }
                        return task
                    })
                  } else {
                    state.error = 'Something went wrong'
                  }
            }
        )
    }
})

export const { setInfo, setError, hideInput } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer