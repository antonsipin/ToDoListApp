import { CREATE_USER, DELETE_TASK, RESOLVE_TASK, GET_TASKS, CREATE_TASK, HIDE_INPUT, UPDATE_TASK } from './types'
import { RegUser } from '../types/RegUser'
import Task from '../types/Task'
import { TaskId } from '../types/Task'
import Action from '../types/Action'

export const addUser = (user: RegUser): Action => ({type: CREATE_USER, payload: user})

export const getTasks = (tasks: Task[]): Action => ({type: GET_TASKS, payload: tasks})

export const resolveTask = (id: TaskId): Action => ({type: RESOLVE_TASK, payload: id})

export const createTask = (task: Task): Action => ({type: CREATE_TASK, payload: task})

export const deleteTask = (id: TaskId): Action => ({type: DELETE_TASK, payload: id})

export const hideInput = (id: TaskId): Action => ({type: HIDE_INPUT, payload: id})

export const updateTask = (id: string, taskName: string, taskDescription: string): Action => ({
    type: UPDATE_TASK, 
    payload: {taskId: id, updateInput: {taskName, taskDescription}}
})