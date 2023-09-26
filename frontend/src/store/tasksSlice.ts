import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import TasksListState from '../types/TasksListState'
import Task from '../types/Task'

export const initialTasksState: TasksListState = {
    tasks: [],
}

function sortByName() {
    return (a: Task, b: Task) => a.name.localeCompare(b.name)
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        deleteTask(state: TasksListState, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter((task) => String(task.id) !== String(action.payload))
        },
        getTasks(state: TasksListState, action: PayloadAction<Task[]>) {
            state.tasks = action.payload.sort(sortByName())
        },
        resolveTask(state: TasksListState, action: PayloadAction<string>) {
            state.tasks = state.tasks.map((task) => {
                if (String(task.id) === String(action.payload)) {
                    task.status = !task.status
                }
                return task
            })
        },
        createTask(state: TasksListState, action: PayloadAction<Task>) {
            state.tasks = [...state.tasks, action.payload].sort(sortByName())
        },
        hideInput(state: TasksListState, action: PayloadAction<string>) {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload) {
                    task.isUpdate = !task.isUpdate
                } 
                return task
            })
        },
        updateTask(state: TasksListState, action: PayloadAction<{taskId: string, updateInput: {taskName: string, taskDescription: string}}>) {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload.taskId && action.payload.updateInput.taskName && task.isUpdate) {
                    task.isUpdate = !task.isUpdate
                    task.name = action.payload.updateInput.taskName
                    task.message = action.payload.updateInput.taskDescription
                } 
                return task
            }).sort(sortByName())
        }
    }
})

export const { updateTask, hideInput, resolveTask, createTask, deleteTask, getTasks } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer