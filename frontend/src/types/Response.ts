import Task from './Task'

export default interface Response {
    result: string
    error: string
    data?: Task
}