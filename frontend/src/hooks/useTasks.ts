import { useCallback } from 'react'
import Task from '../types/Task'
import { useSelector } from 'react-redux'
import { getTasks, resolveTask, createTask, deleteTask, hideInput, updateTask, setInfo, setError } from '../store/tasksSlice'
import { selectTasks, selectTasksError, selectInfo } from '../store/selectors'
import { useAppDispatch } from '../store'
import { useAuth } from '../hooks/useAuth'

function getUrl() {
  const host = window.location.hostname
  if (process.env.NODE_ENV === 'production') {
    return `wss://${host}:3100`
  } else {
    return `ws://${host}:3100`
  }

}
const URL = getUrl()

export default function useTasks() {
      const { accessToken } = useAuth()
      const tasks = useSelector(selectTasks)
      const error = useSelector(selectTasksError)
      const info = useSelector(selectInfo)
      const dispatch = useAppDispatch()

      const handleWebSocket = useCallback((id: string, task: string) => {
        const ws = new WebSocket(URL)

        ws.onopen = () => {
          if (id || task) {
            ws.send(JSON.stringify({ id, task }))
          } 
        }
        ws.onmessage = async (event) => {
          if (event.data) {
              const { id, task } = JSON.parse(event.data)
              if (id || task) {
                handleGetTasks()
                handleInfo(false)
                handleError('')
              }
          } 
        }
        ws.onclose = ((event) => {
          ws.send(JSON.stringify('close'))
        })
      }, [])
      

      const handleInfo = useCallback((info: boolean): void => {
        dispatch(setInfo(info))
      }, [dispatch])

      const handleError = useCallback((error: string): void => {
        dispatch(setError(error))
      }, [dispatch])

      const handleGetTasks = useCallback((): void => {
        dispatch(getTasks(accessToken))
      }, [dispatch])

      const handleHide = useCallback((id: string): void => {
        dispatch(hideInput(id))
        handleError('')
        handleInfo(false)
      }, [dispatch, handleError, handleInfo])

      const handleDelete = useCallback((id: string): void => {
        dispatch(deleteTask({id, accessToken}))
        handleWebSocket(id, '')
      }, [dispatch, handleError, handleInfo])

      const handleResolve = useCallback((id: string, status: boolean): void => {
        dispatch(resolveTask({id, status, accessToken}))
        handleWebSocket(id, '')
      }, [dispatch, handleError, handleInfo])

      const handleCreateTask = useCallback(({task, taskDescription}: {task: string, taskDescription: string}) => {
        dispatch(createTask({taskName: task, taskDescription, accessToken}))
        handleWebSocket('', task)
      }, [dispatch, handleError, handleInfo])

      const handleUpdate = useCallback((id: string, taskName: string, taskDescription: string): void => {
        try {
          tasks.map((task: Task) => {
            if (!tasks.some((el: Task) => el.isUpdate === true)) {
                  if (task.id === id) {
                    handleHide(id)
                    handleError('')
                    handleInfo(false)
                }
              } else if (task.isUpdate && taskName && task.id === id) {
                  dispatch(updateTask({taskId: id, accessToken, updateInput: {taskName, taskDescription}}))
                  handleHide(id)
                  handleWebSocket(id, taskName)
            } else if (!task.isUpdate && task.id === id) {
                handleInfo(true)
                handleError('')
            } else if (task.isUpdate && !taskName && task.id === id) {
                hideInput(id)
                handleInfo(false)
                handleError('')
            }
            return task
          })
        } catch (e) {
          handleError(String(e))
        }
      }, [dispatch, handleError, handleHide, handleInfo, tasks])

     return {
        handleGetTasks,
        handleResolve,
        handleCreateTask,
        handleDelete,
        handleHide,
        handleUpdate,
        handleInfo,
        handleError,
        dispatch,
        resolveTask,
        tasks,
        error,
        info
     } 
}