import { useNavigate } from 'react-router-dom'
import './Logout.css'

export default function Logout(): JSX.Element {
    const navigate = useNavigate()

    const handleLogout = (): void => {
        navigate('/')
    }

    return (
        <div className='Logout'>
            <button onClick={handleLogout} type='button' className='LogoutButton'>Logout</button>
        </div>
    )
}