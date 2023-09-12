import { useNavigate } from 'react-router-dom'
import styles from './Logout.module.scss'

export default function Logout(): JSX.Element {
    const navigate = useNavigate()

    const handleLogout = (): void => {
        navigate('/')
    }

    return (
        <div className={styles.Logout}>
            <span className={styles.LogoutMessage}>Do you really want to logout ?</span>
            <button onClick={handleLogout} type='button' className={styles.LogoutButton}>Logout</button>
        </div>
    )
}