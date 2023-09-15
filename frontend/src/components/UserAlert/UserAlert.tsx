import Alert from 'react-bootstrap/Alert'
import styles from './UserAlert.module.scss'
import { Button } from '../../components/Button'

interface AlertProps {
  error: string
  onHandleError: (error: string) => void
}

function UserAlert ({ error, onHandleError }: AlertProps) {
  return (
    <div>
      {[
        'info',
      ].map((variant) => (
            <Alert key={variant} variant={variant}>
              <div className={styles.Wrapper}>
                {error || `Something went wrong`}
                {error && <Button onClick={() => onHandleError('')} btnType='submit' children={'Ok. Got it.'} />}
              </div>
            </Alert>
      ))}
    </div>
  )
}

export default UserAlert