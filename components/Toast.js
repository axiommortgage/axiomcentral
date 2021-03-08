import { useState } from 'react';
import { UilMultiply } from '@iconscout/react-unicons';
import styles from '../styles/ToastsAlerts.module.scss';

const Toast = props => {
  const [closed, setClosed] = useState(!props.showToast);

  const handleToast = (e) => {
    e.preventDefault();
    setClosed(true)
  }


  return (
    <div className={`
        ${styles.ax_toast} 
        ${props.toastType == 'error' ? styles.ax_toast_error : ''} 
        ${props.toastType == 'success' ? styles.ax_toast_success : ''} 
        ${closed ? styles.ax_toast_hidden : styles.ax_toast_visible} 
      `}>
      <button onClick={handleToast}><UilMultiply size={20} /></button>
      <h3>
        {props.toastType == 'success' ? 'Success!' : ''}
        {props.toastType == 'error' ? 'Error!' : ''}
      </h3>
      <p>{props.message}</p>
    </div>
  )
}

export default Toast;