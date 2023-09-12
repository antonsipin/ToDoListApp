import { useNavigate } from 'react-router-dom'
import styles from './SignUp.module.scss'

export default function SignUp(): JSX.Element {
    const navigate = useNavigate()

    const handleSignIn = ():void => {
        navigate('/signIn')
    }

    return (
        <div className={styles.SignUp}>
            <button onClick={handleSignIn} className={styles.SignUpButton}>SignUp</button>
        </div>
    )
}