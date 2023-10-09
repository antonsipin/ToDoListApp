import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SignIn.module.scss'
import Form from 'react-bootstrap/Form'
import { Button } from '../../components/Button'
import { SignInUser } from '../../types/SignInUser'
import UserAlert from '../UserAlert'
import { MdOutlineLogin, MdOutlinePermIdentity } from 'react-icons/md'
import { validateEmail } from '../../utils/validate'
import cn from 'classnames'
import { ThemeContext } from '../../App/ThemeContext'
import { useAuth } from '../../hooks/useAuth'
import { Header } from '../Header'
import * as api from '../../api'

function SignIn(): JSX.Element {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isSubmit, setIsSubmit ] = useState(false)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const { handleLogin, error, user, handleError, handleSetUser } = useAuth()

    const signIn = useCallback(({ email, password }: SignInUser) => {
        try {
            if (email.trim() && password.trim()) {
                if (validateEmail(email)) {
                    api.signIn({ email, password }).then((response) => {
                        if (response.result === 'Error') {
                            handleError(response.error)
                        } else if (response.result === 'Successfully' && response.data) {
                            handleError('')
                            handleSetUser(response.data)
                            navigate('/tasks')
                        } else {
                            handleError('Something went wrong')
                        }
                    })
                } else {
                    handleError('Invalid email format')
                }
            } else {
                handleError('Missing Email or Password')
            }
        } catch (e) {
            handleError(String(e))
        }
    }, [handleError, handleLogin, navigate, user])

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
            <Header />
            <div className={styles.Form}>
                <div className={styles.WrapperAlertForm}>
                    {error && <UserAlert error={error} onHandleError={handleError}/>}
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

export default React.memo(SignIn)