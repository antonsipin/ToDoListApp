import { useState, useReducer } from 'react'
import Task from '../types/Task'
import * as api from '../api/api'
import { taskReducer } from '../reducer/taskReducer'
import TasksListState from '../types/TasksListState'

const initialState: TasksListState = {
    tasks: []
}

export default function useTasks() {
    const [error, setError] = useState<string>('')
    const [state, dispatch] = useReducer(taskReducer, initialState)
    const { tasks } = state 
    const [info, setInfo] = useState<boolean>(false)

    function handleLoadTasks(): void {
        api.getTasks().then((response) => dispatch({type: 'tasks/getTasks', payload: response.data}))
    }

    function handleResolve(id: string): void {
        api.resolveTask(id).then((response) => {
          if (!response.error) {
            dispatch({type: 'tasks/resolveTask', payload: id})
            setError('')
          } else {
            setError(response.error)
          }
        })
      }

      function handleDelete(id: string): void {
        api.deleteTask(id).then((response) => {
          if (response.error) {
            setError(response.error) 
          } else {
            dispatch({type: 'tasks/deleteTask', payload: id})
            setError('')
          }
        })
      }

      function handleHide(id: string): void {
        dispatch({type: 'updateInputs/hideInput', payload: id})
        setError('')
      }

      function handleCreateTask(task: string, taskDescription: string) {
        if (task.length) {
            api.addTask(task, taskDescription).then((response) => {
              if (response.error) {
                setError(response.error)
              } else if (response.data) {
                dispatch({type: 'tasks/createTask', payload: response.data})
                setError('')
                setInfo(false)
              }
            })
          } else {
            setError('Can not add empty task')
            setInfo(false)
          }
      }

      function handleInfo(currentInfo: boolean): void {
        setInfo(currentInfo)
      }

      function handleError(currentError: string): void {
        setError(currentError)
      }

      function handleUpdate(id: string, taskName: string, taskDescription: string): void {
        tasks.map((task) => {
          if (!tasks.some((el: Task) => el.isUpdate === true)) {
                if (task.id === id) {
                  dispatch({type: 'updateInputs/hideInput', payload: id})
                  setError('')
                  handleInfo(false)
              }
            } else if (task.isUpdate && taskName && task.id === id) {
                    api.updateTask(id, taskName, taskDescription).then((response) => {
                      if (response.error) {
                        setError(response.error)
                      } else {
                        dispatch({type: 'tasks/updateTask', payload: {
                          updateInput: { taskName, taskDescription }, taskId: id
                        }})
                        setError('')
                      }
                      handleInfo(false)
                    })
          } else if (!task.isUpdate && task.id === id) {
              handleInfo(true)
              setError('')
          } else if (task.isUpdate && !taskName && task.id === id) {
            dispatch({type: 'updateInputs/hideInput', payload: id})
            handleInfo(false)
          }
          return task
        })
      }

     return {
        handleLoadTasks,
        handleResolve,
        handleCreateTask,
        handleDelete,
        handleHide,
        handleUpdate,
        handleInfo,
        handleError,
        tasks,
        error,
        info
     } 
}