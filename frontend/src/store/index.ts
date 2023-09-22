import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { taskReducer, userReducer } from './reducers'

const composeEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(combineReducers({
    tasks: taskReducer,
    user: userReducer
}), composeEnhancers)

export type RootState = ReturnType<typeof store.getState>