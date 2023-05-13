import { useState, useEffect, useReducer } from 'react'
import Task from './types/Task'
import Info from '../../features/Info'
import Form from '../../features/Form'
import NoTasks from '../../features/NoTasks'
import * as api from './api'
import './TasksList.css'
import reducer from './reducer'
import TasksListState from './types/TasksListState'

const initialState: TasksListState = {
  tasks: []
}

export default function TasksList(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { tasks } = state
  const [input, setInput] = useState<string>('')
  const [updateInput, setUpdateInput] = useState<string>('')
  const [info, setInfo] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    api.getTasks().then((response) => dispatch({type: 'tasks/getTasks', payload: response.data}))
  }, [])

  function handleResolve(id: string): void {
    api.resolveTask(id).then((response) => {
      if (!response.error) {
        dispatch({type: 'tasks/resolveTask', payload: id})
        setError('')
      } else {
        setError(response.error)
      }
      handleInfo(false)
    })
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault() 
    if (input.length) {
      api.addTask(input).then((response) => {
        if (response.error) {
          setError(response.error)
        } else {
          dispatch({type: 'tasks/createTask', payload: response.data})
          setError('')
        }
      })
    } else {
      setError('Can not add empty task')
    }
    handleInfo(false)
  }

  function handleDelete(id: string): void {
    api.deleteTask(id).then((response) => {
      if (response.error) {
        setError(response.error) 
      } else {
        dispatch({type: 'tasks/deleteTask', payload: id})
        setError('')
      }
      handleInfo(false)
    })
  }

  function handleHide(id: string): void {
    dispatch({type: 'updateInputs/hideInput', payload: id})
    setError('')
    handleInfo(false)
  }

  function handleUpdate(id: string): void {
    tasks.map((task) => {
      if (!tasks.some((el: Task) => el.isUpdate === true)) {
            if (task.id === id) {
              dispatch({type: 'updateInputs/hideInput', payload: id})
              setError('')
          }
        } else if (task.isUpdate && updateInput && task.id === id) {
                api.updateTask(id, updateInput).then((response) => {
                  if (response.error) {
                    setError(response.error)
                  } else {
                    dispatch({type: 'tasks/updateTask', payload: {updateInput, taskId: id}})
                    setError('')
                  }
                  handleInfo(false)
                })
      } else if (!task.isUpdate && task.id === id) {
          handleInfo(true)
          setError('')
      } else if (task.isUpdate && !updateInput && task.id === id) {
        dispatch({type: 'updateInputs/hideInput', payload: id})
        handleInfo(false)
      }
      return task
    })
  }

  function handleInfo(currentInfo: boolean): void {
    setInfo(currentInfo)
  }

  function handleInput (input: string): void {
    setInput(input)
  }

  function handleError (error: string): void {
    setError(error)
  }

  return (
    <>
      <Info info={info} onHandleInfo={handleInfo}  />
      <Form onHandleSubmit={handleSubmit} onHandleInput={handleInput} onHandleError={handleError} error={error}/>
      {
          tasks.length ?  tasks.map(
            (task: Task) => 
                <div className={task.status ? 'Resolved' : 'UnResolved'} key={task.id}>
                    <span className={task.status ?'ResolvedTaskName' : 'TaskName'}>{task.name}</span>
                  {
                    task.isUpdate && <input placeholder='Type new task' className='Input' onChange={(event) => setUpdateInput(event.target.value)} type="text" />
                  }
                  {
                    <button type='button' onClick={() => handleResolve(task.id)} className='ResolveButton'>{task.status ? 'UnResolve' : 'Resolve'}</button>
                  }
                  {
                    task.isUpdate && !updateInput.length ? 
                    <button onClick={() => handleHide(task.id)} className='HideButton' type='button'>Hide input</button>:
                    <button className='UpdateButton' onClick={() => handleUpdate(task.id)} type='button'>Update</button>
                  }
                  <button onClick={() => handleDelete(task.id)} className='DeleteButton' type='button'>Delete</button>
                </div>
        ) :
          <NoTasks />
      }
    </>
  )
}
