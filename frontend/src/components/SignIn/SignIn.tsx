import { useNavigate } from 'react-router-dom'
import styles from './SignIn.module.scss'

export default function SignIn(): JSX.Element {
    const navigate = useNavigate()

    const handleSignIn = ():void => {
        navigate('/tasks')
    }

    return (
        <div className={styles.SignIn}>
            <button onClick={handleSignIn} className={styles.SignInButton}>SignIn</button>
        </div>
    )
}