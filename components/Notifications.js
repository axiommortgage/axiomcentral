import {useState, useContext} from 'react';
import NotificationsContext from '../context/notificationsContext';
import styles from '../styles/Notifications.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Markdown from './Markdown';

const Notifications = props => {

  const {notifications} = useContext(NotificationsContext);
  const items = notifications.notfs;
  console.log(items)
  return(
    <div className={`${styles.ax_notification_list} ${props.isopen ? styles.ax_notifications_visible : styles.ax_notifications_hidden}`}>
      {items ? 
        items.map((item, index) => {
          return(
            <div className={alerts.ax_tip} key={index}>
              <h3>{item.title}</h3>
              <Markdown>{item.content}</Markdown>
            </div>
          )
        })
      : 
      ''}
    </div>
  )
}

export default Notifications;