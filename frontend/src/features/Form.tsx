import { useState } from 'react'
import './Form.css'

interface FormProps {
    onHandleSubmit: (event:React.FormEvent, input: string) => void
    onHandleError: (error: string) => void
    error: string
}

export default function Form({onHandleSubmit, onHandleError, error}: FormProps): JSX.Element {
  const [input, setInput] = useState<string>('')

    return (
        <>
            <div className='Form'>
            <form onSubmit={(event) => onHandleSubmit(event, input)}>
            <input onChange={(event) => setInput(event.target.value)} className='InputForm' placeholder='Type task' type="text" />{' '}
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