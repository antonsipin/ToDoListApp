import { useState, useEffect } from 'react'
import Task from './types/Task'
import * as api from './api'
import './TasksList.css'

export default function TasksList(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState<string>('')

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
    api.deleteTask(id).then(() => setTasks((tasks) => tasks.filter((el) => el.id !== id)))
  }

  return (
    <>
      {
          tasks.length && tasks.map(
            (task: Task) => 
              task.status ?
                <div className='Resolved' key={task.id}>
                  <span className='ResolvedTaskName'>{task.name}</span>
                  <button type='button' onClick={() => handleResolve(task.id, task.status)} className='ResolveButton'>UnResolve</button>
                  <button onClick={() => handleDelete(task.id)} className='DeleteButton' type='button'>Delete</button>
                </div> :
                <div className='UnResolved' key={task.id}>
                  <span className='TaskName'>{task.name}</span>
                  <button type='button' onClick={() => handleResolve(task.id, task.status)} className='ResolveButton'>Resolve</button>
                  <button onClick={() => handleDelete(task.id)} className='DeleteButton' type='button'>Delete</button>
                </div>
            
          )
      }
      <div className='Form'>
        <form onSubmit={handleSubmit}>
          <input onChange={(event) => setInput(event.target.value)} className='Input' placeholder='Type new task name' type="text" />{' '}
          <button className='FormButton'>Add task</button>
      </form>
      </div>
    </>
  )
}
