/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AuthContext from '../context/authContext'
import { authStatus } from '../auth/auth'

const MyApp = ({ Component, pageProps }) => {
  const [userAuth, setUserAuth] = useState({ isAuth: authStatus() })

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthContext.Provider>
  )
}

export default MyApp
