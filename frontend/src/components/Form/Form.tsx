import { useState } from 'react'
import styles from './Form.module.scss'

interface FormProps {
    onHandleSubmit: (event:React.FormEvent, task: string, taskDescription: string) => void
}

export default function Form({onHandleSubmit}: FormProps): JSX.Element {
  const [task, setTask] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')

    return (
        <div className={styles.Form}>
          <form onSubmit={(event) => onHandleSubmit(event, task, taskDescription)}>
            <input 
              onChange={(event) => setTask(event.target.value)} 
              className={styles.InputForm} 
              placeholder='Task name' 
              type="text" />{' '}
            <input 
              onChange={(event) => setTaskDescription(event.target.value)} 
              className={styles.InputForm} 
              placeholder='Task description' 
              type="text" />{' '}
            <button className={styles.FormButton}>
              Add task
            </button>
          </form>
      </div>
    )
}