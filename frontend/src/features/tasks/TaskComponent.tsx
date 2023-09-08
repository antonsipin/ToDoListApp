import Task from './types/Task'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './TaskComponent.module.scss'
import { Button } from '../../components/Button'

interface TaskProps {
  onHandleUpdate: (id: string, updateInput: string) => void
  onHandleDelete: (id: string) => void
  onHandleHide: (id: string) => void
  onHandleResolve: (id: string) => void
  className: string
  task: Task
}

export default function TaskComponent({className, task, onHandleUpdate, onHandleDelete, onHandleHide, onHandleResolve}: TaskProps): JSX.Element {
  const [updateInput, setUpdateInput] = useState<string>('')

    return (
        <div className={className}>
            <div className={task.status ? styles.Resolved : styles.UnResolved} >
                  <Link to={`/tasks/${task.id}`}>
                    <span className={task.status ? styles.ResolvedTaskName : styles.TaskName}>{task.name}</span>
                  </Link>
                    
                  {
                    task.isUpdate && <input placeholder='Type new task' className={styles.Input} onChange={(event) => setUpdateInput(event.target.value)} type="text" />
                  }
                  {
                    
                  <Button 
                    onClick={() => onHandleResolve(task.id)} 
                    children={task.status ? 'UnResolve ⤴️' : 'Resolve ✔️'} 
                    btnType={'resolve'}
                  />
                  }
                  {
                    task.isUpdate && !updateInput ? 

                    <Button 
                    onClick={() => onHandleHide(task.id)}
                    children={'Hide input ✖️'}
                    btnType='hide'
                    />:
                    
                  <Button 
                    onClick={() => onHandleUpdate(task.id, updateInput)} 
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