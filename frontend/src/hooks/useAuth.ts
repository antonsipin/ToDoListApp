// import { createUserError } from './../store/actions'
import React, { useReducer, useState, useMemo, useEffect, useCallback } from 'react'
import { RegUser } from '../types/RegUser'
import { useDispatch, useSelector  } from 'react-redux'

export function useAuth () {
        const store = useSelector((store) => store)
        const dispatch = useDispatch()

        // const user = useCallback((user: RegUser) => {
        //     dispatch(thunkCreateUser(user))
        //     if (user) {
        //         try {
        //             dispatch({ type: 'user/createUser', payload: user})
        //         } catch (e) {
        //             console.log(e)
        //         }
        //     } 
        // }, [])

        return {
            // user,
        }
}