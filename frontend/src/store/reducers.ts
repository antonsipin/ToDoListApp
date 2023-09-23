import Action from '../types/Action'
import Task from '../types/Task'
import { CREATE_USER, DELETE_TASK, RESOLVE_TASK, GET_TASKS, CREATE_TASK, HIDE_INPUT, UPDATE_TASK } from './types'
import { RegUserState } from '../types/RegUserState'
import TasksListState from '../types/TasksListState'

export const initialTasksState: TasksListState = {
    tasks: [],
}

export const initialUserState: RegUserState = {
    user: {
        id: '',
        name: '',
        email: '',
    }
}

export const taskReducer = (state = initialTasksState, action: Action) => {
    function sortByName() {
        return (a: Task, b: Task) => a.name.localeCompare(b.name)
    }

    switch(action.type) {
        case DELETE_TASK: {
            return {

                ...state, 
                tasks: state.tasks.filter((task) => String(task.id) !== String(action.payload))
            }
        }
        case RESOLVE_TASK: {
            return {
                ...state, 
                tasks: state.tasks.map((task) => {
                    if (String(task.id) === String(action.payload)) {
                        task.status = !task.status
                    }
                    return task
                })
            }
        }
        case GET_TASKS: {
            return {
                ...state, 
                tasks: action.payload.sort(sortByName())
            }
        }
        case CREATE_TASK: {
            return {
                ...state, 
                tasks: [...state.tasks, action.payload].sort(sortByName())
            }
        }
        case HIDE_INPUT: {
            return {
                ...state, 
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload) {
                        task.isUpdate = !task.isUpdate
                    } 
                    return task
                })
            }
        }
        case UPDATE_TASK: {
            return {
                ...state, 
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId && action.payload.updateInput.taskName && task.isUpdate) {
                        task.isUpdate = !task.isUpdate
                        task.name = action.payload.updateInput.taskName
                        task.message = action.payload.updateInput.taskDescription
                    } 
                    return task
                }).sort(sortByName())
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export const userReducer = (state = initialUserState, action: Action) => {
    switch(action.type) {
        case CREATE_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
