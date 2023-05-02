import { useState, useEffect } from 'react'

export default function Counter(): JSX.Element {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {count}
    </>
  )
} 
