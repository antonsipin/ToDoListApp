import { useCallback } from 'react'
import Task from '../types/Task'
import { useSelector } from 'react-redux'
import { getTasks, resolveTask, createTask, deleteTask, hideInput, updateTask, setInfo, setError } from '../store/tasksSlice'
import { selectTasks, selectError, selectInfo } from '../store/selectors'
import { useAppDispatch } from '../store'

export default function useTasks() {
    const tasks = useSelector(selectTasks)
    const error = useSelector(selectError)
    const info = useSelector(selectInfo)
    const dispatch = useAppDispatch()

      const handleGetTasks = useCallback((): void => {
        dispatch(getTasks())
      }, [dispatch])

      const handleHide = useCallback((id: string): void => {
        dispatch(hideInput(id))
      }, [dispatch])

      const handleInfo = useCallback((info: boolean): void => {
        dispatch(setInfo(info))
      }, [dispatch])

      const handleError = useCallback((error: string): void => {
        dispatch(setError(error))
      }, [dispatch])

      const handleDelete = useCallback((id: string): void => {
        dispatch(deleteTask(id))
      }, [dispatch])

      const handleResolve = useCallback((id: string): void => {
        dispatch(resolveTask(id))
      }, [dispatch])

      const handleCreateTask = useCallback(({task, taskDescription}: {task: string, taskDescription: string}) => {
        dispatch(createTask({taskName: task, taskDescription}))
      }, [dispatch])

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
                  dispatch(updateTask({taskId: id, updateInput: {taskName, taskDescription}}))
                  handleHide(id)
            } else if (!task.isUpdate && task.id === id) {
                handleInfo(true)
                handleError('')
            } else if (task.isUpdate && !taskName && task.id === id) {
                hideInput(id)
                handleInfo(false)
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
        tasks,
        error,
        info
     } 
}