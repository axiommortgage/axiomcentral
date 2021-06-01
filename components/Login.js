import { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { setCookie } from 'nookies'
import styles from '../styles/Login.module.scss'
import AuthContext from '../context/authContext'

const Login = () => {
  const route = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [processing, setProcessing] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()

    setProcessing(true)
    const loginInfo = {
      identifier: username,
      password
    }

    const API_URL = `${process.env.API_URL}/auth/local`

    const data = axios
      .post(API_URL, loginInfo)
      .then((res) => {
        setProcessing(false)

        const { jwt } = res.data
        const userId = res.data.user.id

        setUserAuth({ isAuth: true, userInfo: res.data.user })

        setCookie(null, 'jwt', jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })

        setCookie(null, 'userId', userId, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })

        return jwt
      })
      .then(() => {
        route.push('/dashboard')
      })
      .catch((error) => {
        setProcessing(false)
        route.push('/')
        throw error
      })

    return data
  }

  return (
    <section className={styles.ax_login}>
      <div className={styles.ax_login_left_column} />
      <div className={styles.ax_login_right_column}>
        <img src="./images/axiom-a-logo.svg" alt="Axiom Logo" />
        <form className={styles.ax_login_form}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" onClick={(e) => handleLogin(e)}>
            {processing ? <img src="/images/spinner-white.svg" alt="spinner" /> : ''}Login
          </button>
        </form>
        <Link href="/forgot-password">Forgot your password? Click here.</Link>
      </div>
    </section>
  )
}

export default Login
