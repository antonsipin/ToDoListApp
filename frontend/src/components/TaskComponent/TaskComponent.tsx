import Task from '../../types/Task'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './TaskComponent.module.scss'
import { Button } from '../Button'

interface TaskProps {
  onHandleUpdate: (id: string, updateTaskName: string, updateTaskDescription: string) => void
  onHandleDelete: (id: string) => void
  onHandleHide: (id: string) => void
  onHandleResolve: (id: string) => void
  className: string
  task: Task
}

export default function TaskComponent({className, task, onHandleUpdate, onHandleDelete, onHandleHide, onHandleResolve}: TaskProps): JSX.Element {
  const [updateTaskName, setUpdateTaskName] = useState<string>('')
  const [updateTaskDescription, setUpdateTaskDescription] = useState<string>('')

    return (
        <div className={className}>
            <div className={task.status ? styles.Resolved : styles.UnResolved} >
                  <div>
                    <Link to={`/tasks/${task.id}`}>
                      <span className={task.status ? styles.ResolvedTaskName : styles.TaskName}>{task.name}</span>
                    </Link>
                    <span className={styles.TaskDescription}>{task.message}</span>
                  </div>
                  {
                    task.isUpdate && 
                    <div className={styles.updateInputs}>
                      <input placeholder='Task name' className={styles.Input} onChange={(event) => setUpdateTaskName(event.target.value)} type="text" 
                    />
                    <input placeholder='Description' className={styles.Input} onChange={(event) => setUpdateTaskDescription(event.target.value)} type="text" 
                    />
                    </div>
                  }
                  {
                    <Button 
                      onClick={() => onHandleResolve(task.id)} 
                      children={task.status ? 'UnResolve ⤴️' : 'Resolve ✔️'} 
                      btnType={'resolve'}
                    />
                  }
                  {
                    task.isUpdate && !updateTaskName.length ? 
                    <Button 
                    onClick={() => onHandleHide(task.id)}
                    children={'Hide input ✖️'}
                    btnType='hide'
                    />:
                    <Button 
                      onClick={() => onHandleUpdate(task.id, updateTaskName, updateTaskDescription)} 
                      children={'Update ✏️'} 
                      btnType='update'
                    />
                  }
                    <Button 
                      onClick={() => onHandleDelete(task.id)} 
                      children={'Delete ✖️'}
                      btnType='delete'
                    />
                </div>
        </div>
    )
}