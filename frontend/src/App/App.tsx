import TasksList from '../features/tasks/TasksList'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../features/SignIn'
import SignUp from '../features/SignUp'
import MainPage from '../features/MainPage'
import Logout from '../features/Logout'
import TaskCard from '../features/tasks/TaskCard'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

interface FallbackComponentType {
  error: { message: string }
  resetErrorBoundary: () => void
}

function FallbackComponent({ error, resetErrorBoundary } : FallbackComponentType) {
  return (
    <div role="alert">
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
