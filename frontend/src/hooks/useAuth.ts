// import { createUserError } from './../store/actions'
import React, { useReducer, useState, useMemo, useEffect, useCallback } from 'react'
import { RegUser } from '../types/RegUser'
import { userReducer  } from '../reducer/userReducer'
// import { thunkCreateUser } from '../store/actions'
// import { useDispatch, useSelector  } from 'react-redux'

const initialState: RegUser = {
    name: '',
    email: '',
    id: ''
}

export function useAuth () {
        // const store = useSelector((store) => store)
        // const { user, createUserError} = store
        // const dispatch = useDispatch()
        const [ state, dispatch ] = useReducer(userReducer, initialState)

        const dispatchUser = useCallback((user: RegUser) => {
            // dispatch(thunkCreateUser(user))
            if (user) {
                try {
                    dispatch({ type: 'users/createUser', payload: user})
                } catch (e) {
                    console.log(e)
                }
            } 
        }, [])

        return {
            dispatchUser,
            state
        }
}