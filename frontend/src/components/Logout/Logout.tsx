import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Logout.module.scss'
import { Button } from '../../components/Button'
import UserAlert from '../UserAlert'
import { MdOutlineLogout, MdTurnLeft } from 'react-icons/md'
import cn from 'classnames'
import { ThemeContext } from '../../App/ThemeContext'
import { Header } from '../Header'
import { useAuth } from '../../hooks/useAuth'
import useTasks from '../../hooks/useTasks'

export default function Logout(): JSX.Element {
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ logoutError, setLogoutError ] = useState('')
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const { handleLogout, error } = useAuth()
    const { handleError, handleInfo } = useTasks()

    const handleNo = () => {
        navigate(-1)
    }

    const logout = useCallback(() => {
            try {
                handleLogout()
                if (!error) {
                    handleError('')
                    handleInfo(false)
                    navigate('/')
                }
            } catch (e) {
                setLogoutError('Something went wrong')
            }
       
    }, [error, handleError, handleInfo, handleLogout, navigate])

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
                <Header />
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