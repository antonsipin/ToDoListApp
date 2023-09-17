import Task from '../../types/Task'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './TaskComponent.module.scss'
import { Button } from '../Button'
import { UpdateInput } from '../UpdateInput/UpdateInput'
import { MdEditOff, MdDoneOutline, MdRemoveDone, MdEditSquare, MdDeleteOutline } from 'react-icons/md'

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
                      <UpdateInput 
                        taskPlaceholder={'Task name'}
                        taskDescriptionPlaceholder={'Task Description'}
                        task={updateTaskName}
                        taskDescription={updateTaskDescription}
                        setTask={setUpdateTaskName}
                        setTaskDescription={setUpdateTaskDescription}
                      />
                    </div>
                  }
                  {
                    <Button 
                      onClick={() => onHandleResolve(task.id)} 
                      children={
                        task.status ?
                          <div>
                            UnResolve{' '}
                            <MdRemoveDone />
                          </div> :
                          <div>
                            Resolve{' '}
                            <MdDoneOutline />
                          </div>
                      } 
                      btnType={'resolve'}
                    />
                  }
                  {
                    task.isUpdate && !updateTaskName.length ? 
                    <Button 
                    onClick={() => onHandleHide(task.id)}
                    children={
                      <div>
                        Hide input{' '}
                        <MdEditOff />
                      </div>
                    }
                    btnType='hide'
                    />:
                    <Button 
                      onClick={() => onHandleUpdate(task.id, updateTaskName, updateTaskDescription)} 
                      children={
                        <div>
                          Update{' '}
                        <MdEditSquare />
                      </div>
                      } 
                      btnType='update'
                    />
                  }
                    <Button 
                      onClick={() => onHandleDelete(task.id)} 
                      children={
                        <div>
                          Delete{' '}
                          <MdDeleteOutline />
                        </div>
                      }
                      btnType='delete'
                    />
                </div>
        </div>
    )
}
