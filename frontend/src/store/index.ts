import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducers } from './reducers'

const composeEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(reducers, composeEnhancers)