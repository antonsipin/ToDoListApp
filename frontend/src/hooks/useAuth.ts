import { useSelector  } from 'react-redux'
import { selectUser, selectError, selectAccessToken, selectRefreshToken } from '../store/selectors'
import { login, logout, register, setError, setUser } from '../store/userSlice'
import { setError as resetError } from '../store/tasksSlice'
import { useAppDispatch } from '../store'
import { SignInUser } from '../types/SignInUser'
import { User } from '../types/User'
import { ResponseUser } from '../types/ResponseUser'

export function useAuth () {
        const user = useSelector(selectUser)
        const accessToken = useSelector(selectAccessToken)
        const refreshToken = useSelector(selectRefreshToken)
        const error = useSelector(selectError)
        const dispatch = useAppDispatch()

        const handleLogout = (accessToken: string) => {
                dispatch(resetError(''))
                return dispatch(logout(accessToken))
        }

        const handleLogin = (user: SignInUser) => {
                return dispatch(login(user))
        }

        const handleRegister = (user: User) => {
                return dispatch(register(user))
        }

        const handleError = (error: string) => {
                dispatch(setError(error))
        }

        const handleSetUser = (user: ResponseUser) => {
                dispatch(setUser(user))
        }

        return { 
                user,
                error,
                login,
                logout,
                register,
                accessToken,
                refreshToken,
                handleLogout,
                handleLogin,
                handleRegister,
                handleError,
                handleSetUser
        }
}