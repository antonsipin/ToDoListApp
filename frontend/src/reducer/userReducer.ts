import Action from '../types/Action'
import { RegUser } from '../types/RegUser'

export function userReducer(state: RegUser, action: Action): RegUser {
    switch(action.type) {
        case 'users/createUser': {
            return {
                ...state, 
                email: action.payload.email,
                name: action.payload.name,
                id: action.payload.id

            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
