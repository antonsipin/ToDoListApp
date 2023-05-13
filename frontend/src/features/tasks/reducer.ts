import TasksListState from './types/TasksListState'
import Action from './types/Action'

export default function reducer(state: TasksListState, action: Action): TasksListState {
    switch(action.type) {
        case 'tasks/deleteTask': {
            return {
                ...state,
                tasks: state.tasks.filter((task) => String(task.id) !== String(action.payload))
            }
        }
        case 'tasks/resolveTask': {
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
        case 'tasks/getTasks': {
            return {
                ...state,
                tasks: action.payload
            }
        }
        case 'tasks/createTask': {
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        }
        case 'updateInputs/hideInput': {
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
        case 'tasks/updateTask': {
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId && action.payload.updateInput && task.isUpdate) {
                        task.isUpdate = !task.isUpdate
                        task.name = action.payload.updateInput
                    } 
                    return task
                })
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}