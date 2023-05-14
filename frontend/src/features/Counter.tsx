import { useState, useEffect } from 'react'
import './Counter.css'

export default function Counter(): JSX.Element {
  const [count, setCount] = useState(0)
  const [showCount, setShowCount] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  function handleStop() {
    setShowCount((showCount) => !showCount)
  }

  return (
    <>
      <div className='ToDo'>ToDo: {showCount && count}
        <button onClick={handleStop} type='button' className='CountButton'>{showCount ? 'Stop' : 'Start'}</button>
      </div>  
    </>
  )
} 
