import Router from 'next/router'
import NProgress from 'nprogress';
import {useState, useContext, useEffect} from 'react';
import AuthContext from '../context/authContext';
import NotificationsContext from '../context/notificationsContext';
import nookies from 'nookies';
import axios from 'axios';
import Avatar from './Avatar';
import Notifications from './Notifications';
import {UilBell } from '@iconscout/react-unicons';
import styles from '../styles/Topbar.module.scss';

export const customLoader = () => {
  return (
    `
      <div class="${styles.ax_loading_bar} bar" role="bar">
        <div class="${styles.ax_loading_peg} peg">
        </div>
      </div>
      <div class="${styles.ax_loading_spinner} spinner" role="spinner">
        <div class="${styles.ax_loading_spinner_icon} spinner-icon">
        </div>
      </div>
   `
  )
}

NProgress.configure({
  template: customLoader()
});

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
})
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const API_URL = `${process.env.API_URL}`;

const Topbar = props => {
  const {userAuth, setUserAuth} = useContext(AuthContext);
  const obj = JSON.parse(JSON.stringify(nookies.get('jwt')));
  const token = Object.keys(obj).map(function (key) { return obj[key]; });
  const config = { headers: { Authorization: 'Bearer ' + token[0]}}
  const [notifications, setNotifications] = useState({notfs: null});

  const fetchUser = async () => {
    const data = await axios.get(`${API_URL}/users/me`, config).then(res => {
      var me = res.data;
      setUserAuth({...userAuth, userInfo: me});
    }).catch(err => {
      console.log(err)
    });
    return data;
  }

  const fetchNotifications = async () => {
    const data = await axios.get(`${API_URL}/notifications`, config).then(res => {
      let notfs = JSON.parse(JSON.stringify(res.data));
      setNotifications({...notifications, notfs});
    }).catch(err => {
      console.log(err)
    });
    return data;
  }

  useEffect(()=>{
    fetchUser();  
    fetchNotifications();    
  }, []);

  const [showNotfs, setShowNotfs] = useState(false);

  const ntfCounter = () => {
    if(notifications.notfs){
      let items = notifications.notfs;
      return items.length;
    }

    return 0;
  }

  let ntfNumber = ntfCounter();

  return (
    <NotificationsContext.Provider value={{notifications, setNotifications}}>
      <header className={styles.ax_topbar}>
        <div className={styles.ax_logo}>
          <img src="./images/logo.svg" alt="axiom central logo" />
        </div>
        <div className={styles.ax_topbar_actions} >
          <div>
            <button className={styles.ax_noftfs_button} onClick={() => setShowNotfs(!showNotfs) }>
              <span>{ntfNumber}</span>
              <UilBell size={32} />
            </button>
            <Notifications isopen={showNotfs}/>
          </div>
          {userAuth.userInfo ? 
            <>
              <h3>{userAuth.userInfo.firstname} {userAuth.userInfo.lastname}</h3>
              <Avatar photoUrl={userAuth.userInfo.photo.url} size={40} /> 
            </>
          : '' }
        </div>
      </header>
    </NotificationsContext.Provider>
  )
}

export default Topbar;