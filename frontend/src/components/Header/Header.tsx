import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { Select } from '../Select/Select'
import { ThemeContext } from '../../App/ThemeContext'

export const Header = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div className={styles.Header}>
            <Link to='/' className={styles.MainPageLink}>Main Page</Link>
            <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
            <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
            <div className={styles.Select}>
                <Select value={theme} setTheme={setTheme} />
            </div>
        </div>
    )
}