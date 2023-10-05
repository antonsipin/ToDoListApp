import React, { useState, useEffect } from 'react'
import styles from './Form.module.scss'
import { Input } from '../Input'
import { Button } from '../Button'
import { MdPushPin } from 'react-icons/md'

interface FormProps {
    onHandleSubmit: (event:React.FormEvent, task: string, taskDescription: string) => void
}

function Form ({onHandleSubmit}: FormProps): JSX.Element {
  const [task, setTask] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onHandleSubmit(event, task, taskDescription)
  }

  useEffect(() => {
    setTask('')
    setTaskDescription('')
  }, [onHandleSubmit])

    return (
          <div className={styles.Wrapper}>
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
          </div>
    )
}

export default React.memo(Form)