import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import style from '../styles/Login.module.scss'
import Login from '../components/Login'
import AuthContext from '../context/authContext'

const Home = () => {
  const { userAuth } = useContext(AuthContext)
  const router = useRouter()
  if (userAuth.isAuth) {
    router.push('/dashboard')

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <h3 className={style.ax_page_subtitle}>Redirecting...</h3>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Head>
        <title>Axiom Central</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <main>
        <Login />
      </main>
    </motion.div>
  )
}

export default Home
