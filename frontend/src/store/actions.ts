import { CREATE_USER, DELETE_TASK, RESOLVE_TASK, GET_TASKS, CREATE_TASK, HIDE_INPUT, UPDATE_TASK } from './types'
import { RegUser } from '../types/RegUser'
import Task from '../types/Task'
import { TaskId } from '../types/Task'

export const addUser = (user: RegUser) => ({type: CREATE_USER, payload: user})

export const getTasks = (tasks: Task[]) => ({type: GET_TASKS, payload: tasks})

export const resolveTask = (id: TaskId) => ({type: RESOLVE_TASK, payload: id})

export const createTask = (task: Task) => ({type: CREATE_TASK, payload: task})

export const deleteTask = (id: TaskId) => ({type: DELETE_TASK, payload: id})

export const hideInput = (id: TaskId) => ({type: HIDE_INPUT, payload: id})

export const updateTask = (id: string, taskName: string, taskDescription: string) => ({type: UPDATE_TASK, payload: {taskId: id, updateInput: {taskName, taskDescription} } })