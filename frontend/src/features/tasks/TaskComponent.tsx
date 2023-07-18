import Task from './types/Task'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TaskComponent.css'

interface TaskProps {
  onHandleUpdate: (id: string, updateInput: string) => void
  onHandleDelete: (id: string) => void
  onHandleHide: (id: string) => void
  onHandleResolve: (id: string) => void
  task: Task
}

export default function TaskComponent({task, onHandleUpdate, onHandleDelete, onHandleHide, onHandleResolve}: TaskProps): JSX.Element {
  const [updateInput, setUpdateInput] = useState<string>('')

    return (
        <div className='Task'>
            <div className={task.status ? 'Resolved' : 'UnResolved'} >
                    <Link to={`/tasks/${task.id}`}>
                      <span className={task.status ?'ResolvedTaskName' : 'TaskName'}>{task.name}</span>
                    </Link>
                    
                  {
                    task.isUpdate && <input placeholder='Type new task' className='Input' onChange={(event) => setUpdateInput(event.target.value)} type="text" />
                  }
                  {
                    <button type='button' onClick={() => onHandleResolve(task.id)} className='ResolveButton'>{task.status ? 'UnResolve⤴️' : 'Resolve ✔️'}</button>
                  }
                  {
                    task.isUpdate && !updateInput ? 
                    <button onClick={() => onHandleHide(task.id)} className='HideButton' type='button'>Hide input ✖️</button>:
                    <button className='UpdateButton' onClick={() => onHandleUpdate(task.id, updateInput)} type='button'>Update ✏️</button>
                  }
                  <button onClick={() => onHandleDelete(task.id)} className='DeleteButton' type='button'>Delete 🗑</button>
                </div>
        </div>
    )
}