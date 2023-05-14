import './SignIn.css'
import { useNavigate } from 'react-router-dom'

export default function SignIn(): JSX.Element {
    const navigate = useNavigate()

    const handleSignIn = ():void => {
        navigate('/tasks')
    }

    return (
        <div className='SignIn'>
            <button onClick={handleSignIn} className='SignInButton'>SignIn</button>
        </div>
    )
}