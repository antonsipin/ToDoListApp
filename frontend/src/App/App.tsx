import TasksList from '../features/tasks/TasksList'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../features/SignIn'
import SignUp from '../features/SignUp'
import MainPage from '../features/MainPage'
import Logout from '../features/Logout'

export default function App(): JSX.Element {

  return (
      <Routes>
        <Route path='/' element={<MainPage />} >
          <Route path='/signIn' element={<SignIn />}/>
          <Route path='/signUp' element={<SignUp />}/>
        </Route>
        <Route path='/tasks' element={<TasksList />}/>
        <Route path='/logout' element={<Logout />}/>
      </Routes>
  );
}
