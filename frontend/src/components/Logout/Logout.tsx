import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Logout.module.scss'
import { Button } from '../../components/Button'
import UserAlert from '../UserAlert'
import * as api from '../../api'

export default function Logout(): JSX.Element {
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ logoutError, setLogoutError ] = useState('')
    const navigate = useNavigate()

    const handleNo = () => {
        navigate(-1)
    }

    const logout = useCallback(() => {
            try {
                api.logout().then((response) => {
                    if (response.result === 'Error') {
                        setLogoutError(response.error)
                    } else {
                        if (response.result === 'Successfully') {
                            navigate('/')
                            setLogoutError('')
                        }
                    }
                })
            } catch (e) {
                setLogoutError('Something went wrong')
            }
       
    }, [])

    useEffect(() => {
        if (isSubmit) {
            logout()
            setIsSubmit(false)
        }
    }, [setIsSubmit, isSubmit])

    return (
        <div>
            <div className={styles.Wrapper}>
                <div className={styles.Header}>
                    <Link to='/' className={styles.MainPageLink}>Main Page</Link>
                    <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
                    <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
                </div>
                <div className={styles.WrapperAlert}>
                    {logoutError && <UserAlert error={logoutError} onHandleError={setLogoutError}/>}
                    <span className={styles.Text}>
                        Do you really want to logout ?
                    </span>
                    <Button 
                        onClick={() => setIsSubmit(true)} 
                        btnType='submit' 
                        children={'Logout'}
                    />or
                    <Button 
                        onClick={handleNo} 
                        btnType='submit' 
                        children={'Stay logged in'}
                    />
                </div>
                
            </div>
        </div>
    )
}