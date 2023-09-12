import TasksListState from './types/TasksListState'
import Action from './types/Action'
import Task from './types/Task'

export default function reducer(state: TasksListState, action: Action): TasksListState {
    function sortByName() {
        return (a: Task, b: Task) => a.name.localeCompare(b.name)
    }

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
                tasks: action.payload.sort(sortByName())
            }
        }
        case 'tasks/createTask': {
            return {
                ...state,
                tasks: [...state.tasks, action.payload].sort(sortByName())
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