import Head from 'next/head';
import Login from '../components/Login';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { parseCookies } from 'nookies';

const Home = props => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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

export default Home;