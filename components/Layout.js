import { useEffect, useContext } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import AuthContext from '../context/authContext'
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
  const { userAuth, setUserAuth } = useContext(AuthContext)
  const { showToast, message, toastType, children } = props
  const API_URL = `${process.env.API_URL}`
  const token = Cookies.get('jwt')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchUser = async () => {
    const data = await axios
      .get(`${API_URL}/users/me`, config)
      .then((res) => {
        const me = res.data
        setUserAuth({ ...userAuth, userInfo: me })
      })
      .catch((err) => {
        throw err
      })
    return data
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      <section className={styles.ax_layout}>
        <Topbar className={styles.ax_topbar} />
        <Menu className={styles.ax_menu} />
        <Main className={styles.ax_main}>
          <ShowAlerts message={message} toastType={toastType} showToast={showToast} />
          {children}
        </Main>
      </section>
    </AuthContext.Provider>
  )
}

export default Layout
