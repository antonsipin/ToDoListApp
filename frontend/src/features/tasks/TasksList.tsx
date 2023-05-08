import { useState, useEffect } from 'react'
import Task from './types/Task'
import Info from '../../features/Info'
import Form from '../../features/Form'
import NoTasks from '../../features/NoTasks'
import * as api from './api'
import './TasksList.css'

export default function TasksList(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState<string>('')
  const [updateInput, setUpdateInput] = useState<string>('')
  const [info, setInfo] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    api.getTasks().then((response) => setTasks(response.data))
  }, [])

  function handleResolve(id: string, status: boolean): void {
    api.resolveTask(id, status).then((response) => {
      if (!response.error) {
        setTasks((tasks) => tasks.map((el: Task): Task => {
          if (el.id === id) {
            el.status = !status
          }
          return el
        }))
        setError('')
      } else {
        setError(response.error)
      }
      handleInfo(false)
    })
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault() 
    
    api.addTask(input).then((response) => {
      if (response.error) {
        setError(response.error)
      } else {
        setTasks((tasks) => [...tasks, response.data])
        setError('')
      }
      handleInfo(false)
    })
  }

  function handleDelete(id: string): void {
    api.deleteTask(id).then((response) => {
      if (response.error) {
        setError(response.error) 
      } else {
        setTasks((tasks) => tasks.filter((task) => String(task.id) !== String(id)))
        setError('')
      }
      handleInfo(false)
    })
  }

  function handleUpdate(id: string): void {
    setTasks((tasks) => tasks.map((task) => {
      if (!tasks.some((el) => el.isUpdate === true)) {
        if (task.id === id) {
          task.isUpdate = !task.isUpdate
          setError('')
      }
      } else if (task.isUpdate && updateInput && task.id === id) {
          api.updateTask(id, updateInput).then((response) => {
            if (response.error) {
              setError(response.error)
            } else {
              task.isUpdate = !task.isUpdate
              task.name = updateInput
              setError('')
            }
            handleInfo(false)
          })
      } else if (!task.isUpdate && task.id === id) {
        handleInfo(true)
      } else if (task.isUpdate && !updateInput.length && task.id === id) {
        task.isUpdate = !task.isUpdate
        handleInfo(false)
      }
      return task
    }))
  }

  function handleInfo(currentInfo: boolean): void {
    setInfo(currentInfo)
  }

  function handleInput (input: string): void {
    setInput(input)
  }

  function handleError (error: string): void {
    setError(error)
  }

  return (
    <>
      <Info info={info} handleInfo={handleInfo}  />
      <Form handleSubmit={handleSubmit} handleInput={handleInput} handleError={handleError} error={error}/>
      {
          tasks.length ?  tasks.map(
            (task: Task) => 
                <div className={task.status ? 'Resolved' : 'UnResolved'} key={task.id}>
                  {
                    task.status ? <span className='ResolvedTaskName'>{task.name}</span> :
                    <span className='TaskName'>{task.name}</span>
                  }
                  {
                    task.isUpdate && <input placeholder='Type new task' className='Input' onChange={(event) => setUpdateInput(event.target.value)} type="text" />
                  }
                  {
                    task.status ? <button type='button' onClick={() => handleResolve(task.id, task.status)} className='ResolveButton'>UnResolve</button> :
                    <button type='button' onClick={() => handleResolve(task.id, task.status)} className='ResolveButton'>Resolve</button>  
                  }
                  <button className='UpdateButton' onClick={() => handleUpdate(task.id)} type='button'>Update</button>
                  
                  <button onClick={() => handleDelete(task.id)} className='DeleteButton' type='button'>Delete</button>
                </div>
            
        ) :
          <NoTasks />
      }
    </>
  )
}
