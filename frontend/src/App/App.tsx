import './App.css'
import TasksList from '../features/tasks/TasksList'
import { useState } from 'react'
import Counter from '../features/Counter'

export default function App(): JSX.Element {
  const [showCount, setShowCount] = useState(true)

  function handleStop() {
    setShowCount((showCount) => !showCount)
  }

  return (
    <div className='App'>
      <div className='ToDo'>ToDo: {showCount && <Counter />}
        <button onClick={handleStop} type='button' className='CountButton'>{showCount ? 'Stop' : 'Start'}</button>
      </div>  
      <TasksList/>
    </div>
  );
}
