import styles from './MainPage.module.scss'
import { Link, Outlet } from 'react-router-dom'

export default function MainPage(): JSX.Element {
    return (
        <div className={styles.MainPage}>
            <Link to='/' className={styles.MainPageLink}>Main Page</Link>
            <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
            <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
            <Outlet />
        </div>
    )
}