import Action from '../types/Action'
import { RegUserState } from '../types/RegUserState'

export function userReducer(state: RegUserState, action: Action): RegUserState {
    switch(action.type) {
        case 'users/createUser': {
            return {
                ...state, 
                user: action.payload

            }
        }
        case 'users/userError': {
            return {
                ...state,
                createUserError: action.payload, 
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
