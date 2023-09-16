import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './SignUp.module.scss'
import Form from 'react-bootstrap/Form'
import { Button } from '../../components/Button'
import UserAlert from '../UserAlert'
import { User } from '../../types/User'
import * as api from '../../api'

export default function SignUp(): JSX.Element {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ name, setName ] = useState('')
    const [ isSubmit, setIsSubmit ] = useState(false)
    const navigate = useNavigate()
    const [ signUpError, setSignUpError ] = useState('')

    const signUp = useCallback((signUpUser: User) => {
        if (signUpUser) {
            try {
                api.signUp(signUpUser).then((response) => {
                    if (response.result === 'Error') {
                        setSignUpError(response.error)
                    } else {
                        if (response.result === 'Successfully') {
                            navigate('/signIn')
                            setSignUpError('')
                        }
                    }
                })
            } catch (e) {
                setSignUpError('Something went wrong')
            }
        } else {
            setSignUpError('Missing Email or Password')
        }
    }, [])

    useEffect(() => {
        if (isSubmit) {
            signUp({ name, email, password })
            setIsSubmit(false)
        }
    }, [setIsSubmit, isSubmit])

    return (
        <div className={styles.Wrapper}>
            <div className={styles.Header}>
                <Link to='/' className={styles.MainPageLink}>Main Page</Link>
                <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
                <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
            </div>
            <div className={styles.WrapperAlertForm}>
                    {signUpError && <UserAlert error={signUpError} onHandleError={setSignUpError}/>}
                    <Form>
                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={name}
                                placeholder="Enter your name" 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <Form.Text className="text-muted" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                value={email}
                                placeholder="Enter email" 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <Form.Text className="text-muted" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button btnType={'submit'} children={'Create account'} onClick={() => setIsSubmit(true)} />
                    </Form>
            </div>
        </div>
    )
}