import React, { useState, useReducer } from 'react'
import TasksList from '../pages/TasksList/TasksList'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
import MainPage from '../pages/MainPage/MainPage'
import Logout from '../components/Logout/Logout'
import TaskCard from '../pages/TaskCard/TaskCard'
import { ThemeContext } from '../App/ThemeContext'
import { TableModeContext } from '../App/TableModeContext'
import { StateContext } from '../App/StateContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import styles from './App.module.scss'
import { Provider } from 'react-redux'
import { store } from '../store'
import { initialState } from '../reducer/state'
import { taskReducer } from '../reducer/taskReducer'

interface FallbackComponentType {
  error: { message: string }
  resetErrorBoundary: () => void
}

function FallbackComponent({ error, resetErrorBoundary } : FallbackComponentType) {
  return (
    <div className={styles.error} role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default function App(): JSX.Element {
  const queryClient = new QueryClient()
  const [theme, setTheme] = useState('White')
  const [tableMode, setTableMode] = useState(false)
  const [state, dispatch] = useReducer(taskReducer, initialState)

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // reset the state here
      }}
      resetKeys={['someKey']}
    >
      <StateContext.Provider value={{ state, dispatch }}>
        <TableModeContext.Provider value={{ tableMode, setTableMode }}>
          <ThemeContext.Provider value={{ theme, setTheme }} >
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <Routes>
                  <Route path='/' element={<MainPage />} />
                  <Route path='/signIn' element={<SignIn />}/>
                  <Route path='/signUp' element={<SignUp />}/>
                  <Route path='/tasks' element={<TasksList />}/>
                  <Route path='/tasks/:id' element={<TaskCard />} />
                  <Route path='/logout' element={<Logout />}/>
                </Routes>
              </Provider>
            </QueryClientProvider>
          </ThemeContext.Provider>
        </TableModeContext.Provider>
      </StateContext.Provider>
      
    </ErrorBoundary>
  )
}
