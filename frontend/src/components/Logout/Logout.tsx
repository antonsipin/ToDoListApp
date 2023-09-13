import { useNavigate } from 'react-router-dom'
import styles from './Logout.module.scss'
import { Button } from '../../components/Button'

export default function Logout(): JSX.Element {
    const navigate = useNavigate()

    const handleLogout = (): void => {
        navigate('/')
    }

    return (
        <div>
            <div className={styles.Wrapper}>
                <span className={styles.Text}>
                    Do you really want to logout ?
                </span>
                <Button 
                    onClick={handleLogout} 
                    btnType='submit' 
                    children={'Logout'}
                />
            </div>
        </div>
    )
}