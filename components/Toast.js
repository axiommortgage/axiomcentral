import { UilMultiply } from '@iconscout/react-unicons'
import styles from '../styles/ToastsAlerts.module.scss'

const Toast = (props) => {
  const { toastType, showToast, message } = props
  return (
    <div
      className={`
        ${styles.ax_toast} 
        ${toastType === 'error' ? styles.ax_toast_error : ''} 
        ${toastType === 'success' ? styles.ax_toast_success : ''} 
        ${showToast ? styles.ax_toast_visible : styles.ax_toast_hidden} 
      `}
    >
      <button type="button">
        <UilMultiply size={20} />
      </button>
      <h3>
        {toastType === 'success' ? 'Success!' : ''}
        {toastType === 'error' ? 'Error!' : ''}
      </h3>
      <p>{message}</p>
    </div>
  )
}

export default Toast
