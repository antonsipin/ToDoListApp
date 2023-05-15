import { useState, useEffect } from 'react'
import Task from './types/Task'
import Info from '../../features/Info'
import Form from '../../features/Form'
import NoTasks from '../../features/NoTasks'
import Counter from '../Counter'
import './TasksList.css'
import '../Logout.css'
import useTasks from './useTasks'
import { Link } from 'react-router-dom'
import TaskComponent from '../tasks/TaskComponent'

export default function TasksList(): JSX.Element {
  const { info, error, tasks,  handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    handleLoadTasks()
  }, [])

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault() 
    handleCreateTask(input)
  }

  function handleInput(input: string): void {
    setInput(input)
  }

  return (
    <>
      <Link to='/logout' className='LogoutLink'>Logout</Link>
      <Counter />
      <Info onHandleInfo={handleInfo} info={info}  />
      <Form onHandleSubmit={handleSubmit} onHandleInput={handleInput} onHandleError={handleError} error={error}/>
      {
          tasks.length ?  tasks.map(
            (task: Task) => <TaskComponent task={task} onHandleUpdate={handleUpdate} onHandleDelete={handleDelete} onHandleHide={handleHide} onHandleResolve={handleResolve} />
        ) :
          <NoTasks />
      }
    </>
  )
}
