import Task, { TaskId } from './Task'

type Action = 
| { type: 'tasks/getTasks', payload: Task[] }
| { type: 'tasks/createTask', payload: Task }
| { type: 'tasks/resolveTask', payload: TaskId }
| { type: 'tasks/updateTask', payload: {
    taskId: TaskId,
    updateInput: string
} }
| { type: 'tasks/deleteTask', payload: TaskId }
| { type: 'updateInputs/hideInput', payload: TaskId } 

export default Action