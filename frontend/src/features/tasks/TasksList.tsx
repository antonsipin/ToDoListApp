import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Task from './types/Task'
import Info from '../../features/Info'
import Form from '../../features/Form'
import NoTasks from '../../features/NoTasks'
import Counter from '../Counter'
import styles from './TasksList.module.scss'
import '../Logout.css'
import useTasks from './useTasks'
import TaskComponent from '../tasks/TaskComponent'
import { TasksTable } from '../../components/TasksTable'
import { useTasksTableController } from '../../components/TasksTable/TasksTable.controller'
import { Spinner } from '../../components/Loader'
import { TableProps } from '../../components/TasksTable/types'
const URL = 'ws://localhost:3100'

export default function TasksList(props: TableProps): JSX.Element {
  const { info, error, tasks,  handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
  const [theme, setTheme] = useState('White')

  const {
    // page,
    // pageSize,
    totalPages,
    isLoading,
    table,
    totalCount,
    // onPageChange,
    // onPageSizeChange,
    // setNameFilter,
    // nameFilter,
    // mode,
    // onInputNameFilter,
    // onUserSelect,
    // usersSuggestions,
    // exportUsers,
    // isExporting,
  } = useTasksTableController(props)

  useEffect(() => {
    const ws = new WebSocket(URL)
    ws.onopen = () => {
    }
    ws.onmessage = (event) => {
    }
    handleLoadTasks()
  }, [])

  function handleSubmit(event: React.FormEvent, input: string): void {
    event.preventDefault() 
    handleCreateTask(input)
  }

  return (
    <div className={styles[theme]}>
      <div className={styles.header}>
        <Link to='/logout' className='LogoutLink'>Logout</Link>

        <select className={theme} value={theme} onChange={(e) => setTheme(e.currentTarget.value)}>
            <option value='White'>White</option>
            <option value='Black'>Black</option>
        </select>
      </div>
      <Counter />
      <Info onHandleInfo={handleInfo} info={info}  />
      <Form onHandleSubmit={handleSubmit} onHandleError={handleError} error={error}/>

        <TasksTable 
          table={table}
          // page={page}
          // pageSize={pageSize}
          totalItems={totalCount}
          totalPages={totalPages}
          loading={isLoading}
          // headerWrapperClass={styles.headerWrapperClass}
          // rowWrapperClass={styles.rowWrapperClass}
          // onPageChange={onPageChange}
          // onPageSizeChange={onPageSizeChange}
        />

      <div className={styles.taskWrapper}>
        {
            tasks.length ?  tasks.map(
              (task: Task) => <TaskComponent key={task.id} task={task} onHandleUpdate={handleUpdate} onHandleDelete={handleDelete} onHandleHide={handleHide} onHandleResolve={handleResolve} className={theme}/>
          ) :
              <div className={styles.loader}>
                <Spinner />
              </div> || <NoTasks />
        }
      </div>
    </div>
  )
}
