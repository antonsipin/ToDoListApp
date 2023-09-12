import TasksList from '../pages/TasksList/TasksList'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
import MainPage from '../pages/MainPage/MainPage'
import Logout from '../components/Logout/Logout'
import TaskCard from '../pages/TaskCard/TaskCard'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import styles from './App.module.scss'

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

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // reset the state here
      }}
      resetKeys={['someKey']}
    >
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<MainPage />} >
            <Route path='/signIn' element={<SignIn />}/>
            <Route path='/signUp' element={<SignUp />}/>
          </Route>

            <Route path='/tasks' element={<TasksList />}/>
            <Route path='/tasks/:id' element={<TaskCard />} />

          <Route path='/logout' element={<Logout />}/>
        </Routes>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
