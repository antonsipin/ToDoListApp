interface FormProps {
    onHandleSubmit: (event: React.FormEvent) => void
    onHandleInput: (input: string) => void
    onHandleError: (error: string) => void
    error: string
}

export default function Form({onHandleSubmit, onHandleInput, onHandleError, error}: FormProps): JSX.Element {

    return (
        <>
            <div className='Form'>
            <form onSubmit={onHandleSubmit}>
            <input onChange={(event) => onHandleInput(event.target.value)} className='InputForm' placeholder='Type task' type="text" />{' '}
            <button className='FormButton'>Add task 📌</button>
          {
            error && <div className='Error'>{error}
            <button onClick={() => onHandleError('')}className='CloseInfo'>❌</button>
            </div>
          }
            </form>
            </div>
        </>
    )
}