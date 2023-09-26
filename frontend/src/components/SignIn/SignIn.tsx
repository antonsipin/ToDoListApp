import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './SignIn.module.scss'
import Form from 'react-bootstrap/Form'
import { Button } from '../../components/Button'
import { SignInUser } from '../../types/SignInUser'
import * as api from '../../api'
import UserAlert from '../UserAlert'
import { MdOutlineLogin, MdOutlinePermIdentity } from 'react-icons/md'
import { validateEmail } from '../../utils/validate'
import cn from 'classnames'
import { ThemeContext } from '../../App/ThemeContext'
import { Select } from '../Select/Select'
import { addUser } from '../../store/userSlice'
import { useAppDispatch } from '../../store/index'

export default function SignIn(): JSX.Element {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ signInError, setSignInError ] = useState('')
    const navigate = useNavigate()
    const { theme, setTheme } = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    const navigateToTasks = (user: { id: string, name: string, email: string }) => {
        const { id, name, email } = user
        navigate('/tasks', { state: { id, name, email }});
          }
 
    const signIn = useCallback(({ email, password }: SignInUser) => {
        try {
            if (email && password) {
                if (validateEmail(email)) {
                    api.signIn({ email, password }).then((response) => {
                        if (response.result === 'Error') {
                            setSignInError(response.error)
                        } else {
                            if (response.result === 'Successfully' && response.data) {
                                const { id, name, email } = response.data
                                const user = { id, name, email }
                                dispatch(addUser(user))
                                navigateToTasks(user)
                                setSignInError('')
                            }
                        }
                    })
                } else {
                    setSignInError('Invalid email format')
                }
            } else {
                setSignInError('Missing Email or Password')
            }
        } catch (e) {
            setSignInError(String(e))
        }
    }, [])

    useEffect(() => {
        if (isSubmit) {
            signIn({ email, password })
            setIsSubmit(false)
        }
    }, [setIsSubmit, isSubmit])

    const handleRegister = () => {
        navigate('/signUp')
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
            <div className={styles.Form}>
            <div className={styles.WrapperAlertForm}>
                {signInError && <UserAlert error={signInError} onHandleError={setSignInError}/>}
                <Form>
                    <Form.Group style={{color: 'grey'}} className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            value={email}
                            placeholder="Enter email" 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <Form.Text className="text-muted" />
                    </Form.Group>

                    <Form.Group style={{color: 'grey'}} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button 
                    btnType={'submit'} 
                    children={
                        <div>
                          Login{' '}
                          <MdOutlineLogin />
                        </div>
                      }
                    onClick={() => setIsSubmit(true)} 
                    />
                    <span className={styles.btnText}>or</span>
                    <Button 
                    btnType={'submit'} 
                    children={
                        <div>
                          Register{' '}
                          <MdOutlinePermIdentity />
                        </div>
                      } 
                    onClick={handleRegister} 
                    />
                </Form>
            </div>    
                
            </div>
        </div>
    )
}