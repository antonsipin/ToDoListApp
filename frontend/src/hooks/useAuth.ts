import { createUserError } from './../store/actions';
// import { createUserError } from './../store/actions'
import React, { useReducer, useState, useMemo, useEffect, useCallback } from 'react'
import { User } from '../types/User'
import { RegUserState } from '../types/RegUserState'
import { userReducer  } from '../reducer/userReducer'
// import { thunkCreateUser } from '../store/actions'
// import { useDispatch, useSelector  } from 'react-redux'
import * as api from '../api'

const initialState: RegUserState = {
    user: {
        name: '',
        email: '',
        id: ''
    },
    createUserError: ''
}

export function useAuth () {
        // const store = useSelector((store) => store)
        // const { user, createUserError} = store
        // const dispatch = useDispatch()
        const [ state, dispatch ] = useReducer(userReducer, initialState)
        const { user, createUserError } = state
        const [ signUpError, setSignUpError ] = useState('')
        const currentError = useMemo(() => signUpError, [signUpError])
        

        const signUp = useCallback((signUpUser: User) => {
            // dispatch(thunkCreateUser(user))
            if (signUpUser) {
                try {
                    api.createUser(signUpUser).then((response) => {
                        if (response.error) {
                            dispatch({ type: 'users/userError', payload: response.error})
                            setSignUpError(response.error)
                        } else {
                            if (response.data) {
                                dispatch({ type: 'users/createUser', payload: response.data})
                                setSignUpError('')
                            }
                        }
                    })
                } catch (e) {
                    dispatch({type: 'users/userError', payload: 'Something went wrong'})
                    setSignUpError('Something went wrong')
                    console.log(e)
                }
            } else {
                dispatch({type: 'users/userError', payload:'Missing Email or Password'})
                setSignUpError('Missing Email or Password')
            }
            return {
                signUpError
            }
        }, [])

        useEffect(() => {
            setSignUpError(createUserError)
        }, [signUp])
        
        return {
            signUp,
            signUpError
        }
}