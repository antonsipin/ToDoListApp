import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MainPage.module.scss'
import { Link, Outlet } from 'react-router-dom'
import cn from 'classnames'
import { Button } from '../../components/Button'
import { MdFlightTakeoff } from 'react-icons/md'
import { Select } from '../../components/Select/Select'
import { ThemeContext } from '../../App/ThemeContext'

export default function MainPage(): JSX.Element {
    const navigate = useNavigate()
    const { theme, setTheme } = useContext(ThemeContext)

    const handleStart = () => {
        navigate('/signIn')
    }
    return (
        <div className={cn(
            styles.Wrapper,
            styles[`Wrapper--${theme}`]
            )}>
            <div className={styles.Header}>
                <Link to='/' className={styles.MainPageLink}>Main Page</Link>
                <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
                <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
                <div className={styles.Select}>
                    <Select value={theme} setTheme={setTheme} />
                </div>
            </div>
            <div className={styles.Body}>
                <div className={styles.ToDoList}>
                    ToDo List
                </div> 
                <div className={styles.Text}>
                    Helper to plan your tasks
                </div>
                <Button 
                    onClick={handleStart} 
                    children={
                        <div>
                          Start{' '}
                          <MdFlightTakeoff />
                        </div>
                    } 
                    btnType={'start'}
                />
            </div>
        </div>
    )
}