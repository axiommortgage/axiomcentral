import Layout from '../components/Layout';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import axios from 'axios';
import getJwt from '../helpers/formatCookie';
import style from '../styles/AddBroker.module.scss'

const AllBrokers = props => {

  const users = props.users;
  console.log(users);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Layout>
        <h1 className={style.ax_page_title}>All Brokers</h1>
        <div className={style.ax_card_list}>
          {users.map((user, index) => {
            return (
              <Card
                key={index}
                title={`${user.firstname} ${user.lastname} `}
                photo={user.photo.url !== undefined ? user.photo.url : './images/axiom-a-logo.svg'}
              />
            )
          })}
        </div>
      </Layout >
    </motion.div>
  )
}

const API_URL = `${process.env.API_URL}`;

export const getServerSideProps = async (ctx) => {
  const token = getJwt(ctx.req.headers.cookie);
  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const data = await axios.get(`${API_URL}/users`, config).then(res => {
    var users = res.data;
    return users;
  }).catch(err => {
    console.log(err)
  });

  return {
    props: {
      users: data
    }
  }
}

export default AllBrokers;