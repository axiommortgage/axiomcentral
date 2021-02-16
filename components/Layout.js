import Topbar from './Topbar.js';
import Menu from './Menu.js';
import Main from './Main.js';
import Toast from '../components/Toast';
import styles from '../styles/Layout.module.scss';

const ShowAlerts = props => {
  if(props.showToast){
    return(         
      <Toast message={props.message} toastType={props.toastType} showToast={props.showToast}/>
    )
  }else{
    return(
      <></>
    )
  }  
}

const Layout = props => {
  return (
    <section className={styles.ax_layout}>
      <Topbar className={styles.ax_topbar} />
      <Menu className={styles.ax_menu} />
      <Main className={styles.ax_main}> 
        <ShowAlerts message={props.message} toastType={props.toastType} showToast={props.showToast}/>      
        {props.children}
      </Main>
    </section>
  )
}

export default Layout;