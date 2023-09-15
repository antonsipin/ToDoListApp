import { CREATE_USER, CREATE_USER_ERROR } from './types'

const initialState = {
    // tasks: [],
    user: {
        id: '',
        name: '',
        email: ''
    },
    createUserError: ''
}

export const reducers = (state = initialState, action: any) => {
    switch(action.type) {
        case CREATE_USER: {
            return {
                ...state, 
                user: action.payload

            }
        }
        case CREATE_USER_ERROR: {
            return {
                ...state,
                error: action.payload, 
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}