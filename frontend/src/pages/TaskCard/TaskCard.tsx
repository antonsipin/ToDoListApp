import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useTasks from '../../hooks/useTasks'
import { Button } from '../../components/Button'
import styles from './TaskCard.module.scss' 
import { MdEditOff, MdDoneOutline, MdRemoveDone, MdEditSquare, MdDeleteOutline, MdTurnLeft } from 'react-icons/md'
import { UpdateInput } from '../../components/UpdateInput/UpdateInput'
import { AlertComponent } from '../../components/Alert'

export default function TaskCard(): JSX.Element {
    const { info, error, tasks, handleInfo, handleError, handleLoadTasks, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
    const navigate = useNavigate()
    const params = useParams()
    const id = String(params.id)
    const [taskName, setTaskName] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')

    useEffect(() => {
        handleLoadTasks()
      }, [])

    const handleBack = () => navigate(-1)
    const task = tasks.find((task) => task.id === id)

    const onHandleDelete = (id: string) => {
        handleDelete(id)
        handleBack()
    }

    return (
        <div className={styles.Wrapper}>
          <div className={styles.Header}>
                <Link to='/' className={styles.MainPageLink}>Main Page</Link>
                <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
                <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
          </div>

          {info || error ? 
            <AlertComponent 
            error={error} 
            info={info} 
            onHandleInfo={handleInfo} 
            onHandleError={handleError}/>: ''
            }

          <div className={styles.taskCard}>
            <div className={task?.status ? styles.ResolvedTaskName : styles.TaskName}>{task?.name}</div>

            <div className={styles.TaskDescription}>Description: {task?.message}</div>
            {
              task && task.isUpdate && 
                    <div className={styles.updateInputs}>
                      <UpdateInput 
                        taskPlaceholder={'Task name'}
                        taskDescriptionPlaceholder={'Task Description'}
                        task={taskName}
                        taskDescription={taskDescription}
                        setTask={setTaskName}
                        setTaskDescription={setTaskDescription}
                      />
                    </div>
            }

            {task && <div className={styles.buttons}>
                  
                  {
                    
                    <Button 
                    onClick={() => handleResolve(task.id)} 
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
                    task.isUpdate && !taskName.length ? 
                    <Button 
                    onClick={() => handleHide(task.id)}
                    children={
                      <div>
                        Hide input{' '}
                        <MdEditOff />
                      </div>
                    }
                    btnType='hide'
                    />:
                    <Button 
                      onClick={() => handleUpdate(task.id, taskName, taskDescription)} 
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
                      onClick={() => handleDelete(task.id)} 
                      children={
                        <div>
                          Delete{' '}
                          <MdDeleteOutline />
                        </div>
                      }
                      btnType='delete'
                    />
                  <Button 
                      onClick={handleBack} 
                      children={
                        <div>
                          Back{' '}
                          <MdTurnLeft />
                        </div>
                      }
                      btnType='back'
                    />
                </div>
            }
          </div>  
        </div>
        
    )
}