import { useState } from 'react'

interface FormProps {
    handleSubmit: (event: React.FormEvent) => void
    handleInput: (input: string) => void
    handleError: (error: string) => void
    error: string
}

export default function Form({handleSubmit, handleInput, handleError, error}: FormProps): JSX.Element {
    const [input, setInput] = useState<string>('')

    return (
        <>
            <div className='Form'>
            <form onSubmit={handleSubmit}>
            <input onChange={(event) => handleInput(event.target.value)} className='InputForm' placeholder='Type task' type="text" />{' '}
            <button className='FormButton'>Add task</button>
          {
            error && <div className='Error'>{error}
            <button onClick={() => handleError('')}className='CloseInfo'>X</button>
            </div>
          }
            </form>
            </div>
        </>
    )
}