import { useState, useEffect } from 'react'
import Task from './types/Task'
import * as api from './api'
import './TasksList.css'

export default function TasksList(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState<string>('')
  const [updateInput, setUpdateInput] = useState<string>('')
  const [info, setInfo] = useState<boolean>(false)

  useEffect(() => {
    api.getTasks().then((tasks) => setTasks(tasks))
  }, [])

  function handleResolve(id: string, status: boolean): void {
    api.resolveTask(id, status).then((task) => {
      setTasks((tasks) => tasks.map((el: Task): Task => {
        if (el.id === task.id) {
          el.status = task.status
        }
        return el
      }))
    })
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault() 
    
    api.addTask(input).then((task) => setTasks((tasks) => [...tasks, task]))
  }

  function handleDelete(id: string): void {
    setTasks((tasks) => tasks.filter((task) => String(task.id) !== String(id)))

    api.deleteTask(id)
  }

  function handleUpdate(id: string): void {
    setTasks((tasks) => tasks.map((task) => {
      if (!tasks.some((el) => el.isUpdate === true)) {
        if (task.id === id) {
          task.isUpdate = !task.isUpdate
      }
      } else if (task.isUpdate && updateInput && task.id === id) {
          task.name = updateInput
          api.updateTask(id, updateInput)
          task.isUpdate = !task.isUpdate
          setInfo(false)
      } else if (!task.isUpdate && task.id === id) {
        setInfo(true)
      } else if (task.isUpdate && !updateInput.length && task.id === id) {
          task.isUpdate = !task.isUpdate
      }
      return task
    }))
  }

  return (
    <>
      {
        info && <div className='Info'>Some task is already being updated. Please save it and try again.
          <button onClick={() => setInfo(false)}className='CloseInfo'>X</button>
        </div>
      }
      <div className='Form'>
        <form onSubmit={handleSubmit}>
          <input onChange={(event) => setInput(event.target.value)} className='Input' placeholder='Type task' type="text" />{' '}
          <button className='FormButton'>Add task</button>
      </form>
      </div>
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
          <div className='NoTasks'>
            Let's add a task!
          </div> 
      }
    </>
  )
}
