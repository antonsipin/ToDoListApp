import { useState, useContext } from 'react'
import Task from '../types/Task'
import * as api from '../api/api'
import { StateContext } from '../App/StateContext'

export default function useTasks() {
    const [error, setError] = useState<string>('')
    const { state, dispatch } = useContext(StateContext)
    const { tasks } = state 
    const [info, setInfo] = useState<boolean>(false)

    function handleLoadTasks(): void {
      try {
        api.getTasks().then((response) => {
          if (response.result === 'Error' && response.error) {
            setError(response.error)
          } else if (response.result === 'Successfully' && response.data) {
            dispatch({type: 'tasks/getTasks', payload: response.data})
            setError('')
          } else {
            setError('Something went wrong')
          }
        })
      } catch (e) {
        setError(String(e))
      }
    }

    function handleResolve(id: string): void {
      try {
        api.resolveTask(id).then((response) => {
          if (response.result === 'Successfully') {
            dispatch({type: 'tasks/resolveTask', payload: id})
            setError('')
          } else if (response.result === 'Error' && response.error) {
            setError(response.error)
          } else {
            setError('Something went wrong')
          }
        })
      } catch (e) {
        setError(String(e))
      }
        
      }

      function handleDelete(id: string): void {
        try {
          api.deleteTask(id).then((response) => {
            if (response.result === 'Error') {
              setError(response.error) 
            } else if (response.result === 'Successfully') {
              dispatch({type: 'tasks/deleteTask', payload: id})
              setError('')
            } else {
              setError('Something went wrong')
            }
          })
        } catch (e) {
          setError(String(e))
        }
      }

      function handleHide(id: string): void {
        try {
          dispatch({type: 'updateInputs/hideInput', payload: id})
          setError('')
        } catch (e) {
          setError(String(e))
        }
      }

      function handleCreateTask(task: string, taskDescription: string) {
        try {
          if (task.length) {
            api.addTask(task, taskDescription).then((response) => {
              if (response.result === 'Error') {
                setError(response.error)
              } else if (response.result === 'Successfully' && response.data) {
                dispatch({type: 'tasks/createTask', payload: response.data})
                setError('')
                setInfo(false)
              } else {
                setError('Something went wrong')
              }
            })
          } else {
            setError('Can not add empty task')
            setInfo(false)
          }
        } catch (e) {
          setError(String(e))
        }
      }

      function handleInfo(currentInfo: boolean): void {
        setInfo(currentInfo)
      }

      function handleError(currentError: string): void {
        setError(currentError)
      }

      function handleUpdate(id: string, taskName: string, taskDescription: string): void {
        try {
          tasks.map((task) => {
            if (!tasks.some((el: Task) => el.isUpdate === true)) {
                  if (task.id === id) {
                    dispatch({type: 'updateInputs/hideInput', payload: id})
                    setError('')
                    handleInfo(false)
                }
              } else if (task.isUpdate && taskName && task.id === id) {
                      api.updateTask(id, taskName, taskDescription).then((response) => {
                        if (response.result === 'Error' &&  response.error) {
                          setError(response.error)
                        } else if (response.result === 'Successfully' && response.data) {
                          dispatch({type: 'tasks/updateTask', payload: {
                            updateInput: { taskName, taskDescription }, taskId: id
                          }})
                          setError('')
                        } else {
                          setError('Something went wrong')
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
        } catch (e) {
          setError(String(e))
        }
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