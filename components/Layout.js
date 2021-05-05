import Topbar from './Topbar'
import Menu from './Menu'
import Main from './Main'
import Toast from './Toast'
import styles from '../styles/Layout.module.scss'

const ShowAlerts = (props) => {
  const { showToast, message, toastType } = props

  if (showToast) {
    return <Toast message={message} toastType={toastType} showToast={showToast} />
  }
  return <></>
}

const Layout = (props) => {
  const { showToast, message, toastType, children } = props

  return (
    <section className={styles.ax_layout}>
      <Topbar className={styles.ax_topbar} />
      <Menu className={styles.ax_menu} />
      <Main className={styles.ax_main}>
        <ShowAlerts message={message} toastType={toastType} showToast={showToast} />
        {children}
      </Main>
    </section>
  )
}

export default Layout
