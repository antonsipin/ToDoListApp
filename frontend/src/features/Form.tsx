import { useState } from 'react'
import './Form.css'

interface FormProps {
    onHandleSubmit: (event:React.FormEvent, task: string, taskDescription: string) => void
    onHandleError: (error: string) => void
    error: string
}

export default function Form({onHandleSubmit, onHandleError, error}: FormProps): JSX.Element {
  const [task, setTask] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')

    return (
        <>
            <div className='Form'>
            <form onSubmit={(event) => onHandleSubmit(event, task, taskDescription)}>
            <input onChange={(event) => setTask(event.target.value)} className='InputForm' placeholder='Type task' type="text" />{' '}
            <input onChange={(event) => setTaskDescription(event.target.value)} className='InputForm' placeholder='Task description' type="text" />{' '}
            <button className='FormButton'>Add task 📌</button>
          {
            error && <div className='FormError'>{error}
            <button onClick={() => onHandleError('')} className='CloseInfo'>❌</button>
            </div>
          }
            </form>
            </div>
        </>
    )
}