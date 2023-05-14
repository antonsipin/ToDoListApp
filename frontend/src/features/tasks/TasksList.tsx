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

export default function TasksList(): JSX.Element {
  const { info, error, tasks, handleUpdate, handleCreateTask, handleLoadTasks, handleDelete, handleHide, handleResolve, handleInfo, handleError } = useTasks()
  const [input, setInput] = useState<string>('')
  const [updateInput, setUpdateInput] = useState<string>('')

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
            (task: Task) => 
                <div className={task.status ? 'Resolved' : 'UnResolved'} key={task.id}>
                    <span className={task.status ?'ResolvedTaskName' : 'TaskName'}>{task.name}</span>
                  {
                    task.isUpdate && <input placeholder='Type new task' className='Input' onChange={(event) => setUpdateInput(event.target.value)} type="text" />
                  }
                  {
                    <button type='button' onClick={() => handleResolve(task.id)} className='ResolveButton'>{task.status ? 'UnResolve' : 'Resolve'}</button>
                  }
                  {
                    task.isUpdate && !updateInput.length ? 
                    <button onClick={() => handleHide(task.id)} className='HideButton' type='button'>Hide input</button>:
                    <button className='UpdateButton' onClick={() => handleUpdate(task.id, updateInput)} type='button'>Update</button>
                  }
                  <button onClick={() => handleDelete(task.id)} className='DeleteButton' type='button'>Delete</button>
                </div>
        ) :
          <NoTasks />
      }
    </>
  )
}
