import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Task from './types/Task'
import Info from '../../features/Info'
import Form from '../../features/Form'
import NoTasks from '../../features/NoTasks'
import Counter from '../Counter'
import style from './TasksList.module.css'
import '../Logout.css'
import useTasks from './useTasks'
import TaskComponent from '../tasks/TaskComponent'
import Theme from '../Theme'
const URL = 'ws://localhost:3100'

export default function TasksList(): JSX.Element {
  const { info, error, tasks,  handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()

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
    <div className={style.TasksList}>
      <div className={style.Header}>
        <Link to='/logout' className='LogoutLink'>Logout</Link>
        <Theme />
      </div>
      <Counter />
      <Info onHandleInfo={handleInfo} info={info}  />
      <Form onHandleSubmit={handleSubmit} onHandleError={handleError} error={error}/>
      {
          tasks.length ?  tasks.map(
            (task: Task) => <TaskComponent key={task.id} task={task} onHandleUpdate={handleUpdate} onHandleDelete={handleDelete} onHandleHide={handleHide} onHandleResolve={handleResolve} />
        ) :
          <NoTasks />
      }
    </div>
  )
}
