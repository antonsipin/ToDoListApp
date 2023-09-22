import { State } from '../types/State'
import { useSelector  } from 'react-redux'

export function useAuth () {
        const user = useSelector((store: State) => store.user)
        return {
            user
        }
}