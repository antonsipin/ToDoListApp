import { Dispatch, SetStateAction } from 'react'
import { CREATE_USER, CREATE_USER_ERROR } from './types'
import { RegUser } from '../types/RegUser'
import { RegUserState } from '../types/RegUserState'
import { User } from '../types/User'
import * as api from '../api'

type DispatchType = 
| Dispatch<SetStateAction<RegUserState>>
| Dispatch<SetStateAction<string>>
| Dispatch<SetStateAction<RegUser>>

export const createUser = (user: RegUser) => ({type: CREATE_USER, payload: user})

export const createUserError = (error: string) => ({
    type: CREATE_USER_ERROR, payload: error
})

// export const thunkCreateUser = (user: User) => async (dispatch: DispatchType) => {
//     if (user) {
//         try {
//             api.createUser(user).then((response) => {
//                 if (response.error) {
//                     dispatch(createUserError(response.error))
//                 } else {
//                     if (response.data) {
//                         dispatch(createUser(response.data))
//                     }
//                 }
//             })
//         } catch (e) {
//             dispatch(createUserError('Something went wrong') as { type: string; payload: string; })
//             console.log(e)
//         }
//     } else {
//         dispatch(createUserError('Missing Email or Password'))
//     }
// }