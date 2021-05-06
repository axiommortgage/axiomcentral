import { motion } from 'framer-motion'
import axios from 'axios'
import nookies from 'nookies'
import Card from '../components/Card'
import Layout from '../components/Layout'
import style from '../styles/AddBroker.module.scss'

const AllBrokers = (props) => {
  const { users } = props

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <h1 className={style.ax_page_title}>All Brokers</h1>
        <div className={style.ax_card_list}>
          {users.map((user) => (
            <Card
              key={user.firstname}
              title={`${user.firstname} ${user.lastname} `}
              photo={typeof user.photo !== 'undefined' ? user.photo.url : './images/axiom-a-logo.svg'}
            />
          ))}
        </div>
      </Layout>
    </motion.div>
  )
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getServerSideProps = async (ctx) => {
  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx)
    const { jwt } = tokens
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }

    const data = await axios
      .get(`${API_URL}/users`, config)
      .then((res) => {
        const users = res.data
        return users
      })
      .catch((err) => {
        throw err
      })

    return {
      props: {
        users: data
      }
    }
  }
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

export default AllBrokers
