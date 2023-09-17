import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Logout.module.scss'
import { Button } from '../../components/Button'
import UserAlert from '../UserAlert'
import * as api from '../../api'
import { MdOutlineLogout, MdTurnLeft } from 'react-icons/md'
import cn from 'classnames'
import { ThemeContext } from '../../App/ThemeContext'
import { Select } from '../Select/Select'

export default function Logout(): JSX.Element {
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ logoutError, setLogoutError ] = useState('')
    const navigate = useNavigate()
    const { theme, setTheme } = useContext(ThemeContext)

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
            <div className={cn(
                styles.Wrapper,
                styles[`Wrapper--${theme}`])
                }>
                <div className={styles.Header}>
                    <Link to='/' className={styles.MainPageLink}>Main Page</Link>
                    <Link to='/signIn' className={styles.SignInLink}>SignIn</Link>
                    <Link to='/signUp' className={styles.SignUpLink}>SignUp</Link>
                    <div className={theme}>
                        <Select value={styles.Select} setTheme={setTheme} />
                    </div>
                </div>
                <div className={styles.WrapperAlert}>
                    {logoutError && <UserAlert error={logoutError} onHandleError={setLogoutError}/>}
                    
                    <div className={styles.logoutText}>
                    Do you really want to logout ?
                    </div>

                    <div className={styles.buttons}>
                        <Button 
                            onClick={() => setIsSubmit(true)} 
                            btnType='submit' 
                            children={
                                <div>
                                  Logout{' '}
                                  <MdOutlineLogout />
                                </div>
                              }
                        />
                        <span className={styles.buttonsBetweenText}>
                            or
                        </span>
                        <Button 
                            onClick={handleNo} 
                            btnType='submit' 
                            children={
                                <div>
                                  Stay logged{' '}
                                  <MdTurnLeft />
                                </div>
                              }
                        />
                    </div>
                    
                </div>
                
            </div>
    )
}