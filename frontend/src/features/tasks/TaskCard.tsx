import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import './TaskCard.css'
import useTasks from './useTasks'

export default function TaskCard(): JSX.Element {
    const navigate = useNavigate()
    const { tasks, handleLoadTasks } = useTasks()
    const id = useParams().id
    console.log(tasks)

    useEffect(() => {
        handleLoadTasks()
      }, [])

    const handleBack = () => navigate(-1)
    const task = tasks.find((task) => task.id === id)

    return (
        <div className='TaskCard' key={id}>
            <span className="TaskNameCard">{task?.name}</span>

            <span className="TaskDescription">{task?.message}</span>

            <button className='TaskCardButton' onClick={handleBack} type='button'>Back</button>
        </div>
    )
}