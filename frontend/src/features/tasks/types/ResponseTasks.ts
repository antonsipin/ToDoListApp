import Task from '../types/Task'

export default interface ResponseTasks {
    result: string,
    error: string,
    data: Task[]
}