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

      function handleGetTasks(): void {
        dispatch(getTasks())
      }

      function handleHide(id: string): void {
        dispatch(hideInput(id))
      }

      function handleInfo(info: boolean): void {
        dispatch(setInfo(info))
      }

      function handleError(error: string): void {
        dispatch(setError(error))
      }

      function handleDelete(id: string): void {
        dispatch(deleteTask(id))
      }

      function handleResolve(id: string): void {
        dispatch(resolveTask(id))
      }

      function handleCreateTask({task, taskDescription}: {task: string, taskDescription: string}) {
        dispatch(createTask({taskName: task, taskDescription}))
      }

      function handleUpdate(id: string, taskName: string, taskDescription: string): void {
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
      }

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