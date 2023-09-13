import Alert from 'react-bootstrap/Alert'
import styles from './AlertComponent.module.scss'
import { Button } from '../../components/Button'

interface AlertProps {
  info: boolean
  onHandleInfo: (info: boolean) => void
}

function AlertComponent ({ info, onHandleInfo }: AlertProps) {
  return (
    <div>
      {[
        'info',
      ].map((variant) => (
            <Alert key={variant} variant={variant}>
              <div className={styles.Wrapper}>
                {`Some task is already being updated. Please save it and try again.`}
                <Button onClick={() => onHandleInfo(false)} btnType='submit' children={'Ok! Got it.'} />
              </div>
            </Alert>
      ))}
    </div>
  );
}

export default AlertComponent;