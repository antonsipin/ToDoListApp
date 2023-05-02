import './App.css'
import TasksList from '../features/tasks/TasksList'
import { useState } from 'react'
import Counter from '../features/Counter'

export default function App(): JSX.Element {
  const [showCount, setShowCount] = useState(true)

  function handleStop() {
    setShowCount(!showCount)
  }

  return (
    <div className='App'>
      <div className='ToDo'>ToDo: {showCount && <Counter />}
        {
          showCount ? <button onClick={handleStop} type='button' className='CountButton'>Stop</button> :
          <button onClick={handleStop} type='button' className='CountButton'>Start</button>
        }
      </div>  
      <TasksList/>
    </div>
  );
}
