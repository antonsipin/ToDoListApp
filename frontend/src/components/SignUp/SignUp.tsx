import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './SignUp.module.scss'
import Form from 'react-bootstrap/Form'
import { Button } from '../../components/Button'

export default function SignUp(): JSX.Element {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()

    const handleSubmit = ():void => {
        navigate('/signIn')
    }

    return (
        <div className={styles.Wrapper}>
            <div className={styles.Header}>
                <Link to='/' className={styles.MainPageLink}>Main Page</Link>
                <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
                <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
            </div>
            <div className={styles.Form}>
                <Form>
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
                    <Button btnType={'submit'} children={'Register'} onClick={handleSubmit} />
                </Form>
            </div>
        </div>
    )
}