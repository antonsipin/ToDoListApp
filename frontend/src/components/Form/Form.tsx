import React, { useState, useCallback } from 'react'
import styles from './Form.module.scss'
import { Input } from '../Input'
import { Button } from '../Button'
import { MdPushPin } from 'react-icons/md'
import { useTasks } from '../../hooks'

function Form (): JSX.Element {
  const [task, setTask] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')
  const { handleCreateTask, handleError, handleInfo } = useTasks()

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault()
    if (task) {
      handleCreateTask({task, taskDescription})
      setTask('')
      setTaskDescription('')
      handleError('')
      handleInfo(false)
    } else {
      handleInfo(false)
      handleError('Can not add empty task')
    }
    
  }, [handleCreateTask, handleError, task, taskDescription])

    return (
          <form className={styles.Wrapper}>
            <div className={styles.InputWrapper}>
              <Input 
                taskPlaceholder={'Name'}
                taskDescriptionPlaceholder={'Description'} 
                task={task} 
                taskDescription={taskDescription}
                setTask={setTask}
                setTaskDescription={setTaskDescription} 
              />
            </div>
            
            <div className={styles.wrapperFormButton}>
              <Button 
              children={
                <div>
                  Add task{' '}
                  <MdPushPin />
                </div>
              } 
              btnType='submit' 
              onClickForm={(e: React.FormEvent) => handleSubmit(e)}
              />
            </div>
          </form>
    )
}

export default React.memo(Form)