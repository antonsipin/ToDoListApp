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
import { MaterialTable } from '../../components/TasksTable'
import { Spinner } from '../../components/Loader'
import cn from 'classnames'
import Button from '../../components/Button'
const URL = 'ws://localhost:3100'

export default function TasksList(): JSX.Element {
  const { info, error, tasks,  handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
  const [theme, setTheme] = useState('White')
  const [tableMode, setTableMode] = useState(false)

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
        <Button 
        onClick={() => setTableMode(!tableMode)} 
        children={'Switch mode'} 
        btnType={'mode'}
      />
      </div>
      <Info onHandleInfo={handleInfo} info={info}  />
      <Form onHandleSubmit={handleSubmit} onHandleError={handleError} error={error}/>
      
      {tableMode ? (
        tasks.length  ?
          <div
          className={cn(styles.tableWrapper)}
          >
            <MaterialTable tasks={tasks} />
          </div> :
          <div className={styles.loader}>
          <Spinner />
          </div> || <NoTasks />
      ) : (
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
      )
      }
      
      

      
    </div>
  )
}
