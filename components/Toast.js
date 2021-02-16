import { useState } from 'react';
import styles from '../styles/ToastAlerts.scss';

const Toast = props => {
  const [closed, setClosed] = useState(true);

  setClosed(props.isClosed);

  return(
    <div className={closed ? 'ax_toast_hidden' : 'ax_toast_visible'}>
        
    </div>
  )  
}

export default Toast;