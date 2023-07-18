import './MainPage.css'
import { Link, Outlet } from 'react-router-dom'

export default function MainPage(): JSX.Element {
    return (
        <div className='MainPage'>
            <Link to='/' className='MainPageLink'>Main Page</Link>
            <Link to='/signIn' className='SignInLink'>SignIn</Link>
            <Link to='/signUp' className='SignUpLink'>SignUp</Link>
            <Outlet />
        </div>
    )
}