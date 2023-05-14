import './SignUp.css'
import { useNavigate } from 'react-router-dom'

export default function SignUp(): JSX.Element {
    const navigate = useNavigate()

    const handleSignIn = ():void => {
        navigate('/signIn')
    }

    return (
        <div className='SignUp'>
            <button onClick={handleSignIn} className='SignUpButton'>SignUp</button>
        </div>
    )
}