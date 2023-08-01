import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Task from './types/Task'
import Info from '../../features/Info'
import Form from '../../features/Form'
import NoTasks from '../../features/NoTasks'
import Counter from '../Counter'
import style from './TasksList.module.scss'
import '../Logout.css'
import useTasks from './useTasks'
import TaskComponent from '../tasks/TaskComponent'
const URL = 'ws://localhost:3100'

export default function TasksList(): JSX.Element {
  const { info, error, tasks,  handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
  const [theme, setTheme] = useState('White')

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
    <div className={style[theme]}>
      <div className={style.header}>
        <Link to='/logout' className='LogoutLink'>Logout</Link>

        <select className={theme} value={theme} onChange={(e) => setTheme(e.currentTarget.value)}>
            <option value='White'>White</option>
            <option value='Black'>Black</option>
        </select>
      </div>
      <Counter />
      <Info onHandleInfo={handleInfo} info={info}  />
      <Form onHandleSubmit={handleSubmit} onHandleError={handleError} error={error}/>
      {
          tasks.length ?  tasks.map(
            (task: Task) => <TaskComponent key={task.id} task={task} onHandleUpdate={handleUpdate} onHandleDelete={handleDelete} onHandleHide={handleHide} onHandleResolve={handleResolve} className={theme}/>
        ) :
          <NoTasks />
      }
    </div>
  )
}
