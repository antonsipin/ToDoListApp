import Task from '../types/Task'

export default interface Response {
    result: string
    error: string
    data: Task
}