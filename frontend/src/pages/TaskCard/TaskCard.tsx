import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useTasks from '../../hooks/useTasks'
import { Button } from '../../components/Button'
import styles from './TaskCard.module.scss' 

export default function TaskCard(): JSX.Element {
    const { info, error, tasks,  handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
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
          <div className={styles.TaskCard}>
            <div className={task?.status ? styles.ResolvedTaskName : styles.TaskName}>{task?.name}</div>

            <div className={styles.TaskDescription}>{task?.message}</div>

            {task && <div>
                  {
                    task.isUpdate && <input placeholder='Type new task' className={styles.Input} onChange={(event) => setTaskName(event.target.value)} type="text" />
                  }
                  {
                    
                  <Button 
                    onClick={() => handleResolve(task.id)} 
                    children={task.status ? 'UnResolve ⤴️' : 'Resolve ✔️'} 
                    btnType={'resolve'}
                  />
                  }
                  {
                    task.isUpdate && !taskName ? 

                    <Button 
                    onClick={() => handleHide(task.id)}
                    children={'Hide input ✖️'}
                    btnType='hide'
                    />:
                    
                  <Button 
                    onClick={() => handleUpdate(task.id, taskName, taskDescription)} 
                    children={'Update ✏️'} 
                    btnType='update'
                  />
                  }
                  <Button 
                    onClick={() => onHandleDelete(task.id)} 
                    children={'Delete ✖️'}
                    btnType='delete'
                  />
                  <Button 
                    onClick={handleBack} 
                    children={'Back'}
                    btnType='back'
                  />
                </div>
            }
          </div>  
        </div>
        
    )
}