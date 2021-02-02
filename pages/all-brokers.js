import Layout from '../components/Layout';
import Card from '../components/Card';
import axios from 'axios';
import style from '../styles/AddBroker.module.scss'


const AllBrokers = props => {

  const users = props.users;
  console.log(users);

  return (
    <Layout>
      <h1 className={style.ax_page_title}>All Brokers</h1>
      <div className={style.ax_card_list}>
        {users.map((user, index) => {
          return (
            <Card
              key={index}
              title={`${user.firstname} ${user.lastname} `}
              photo={user.photo.url ? user.photo.url : './images/axiom-a-logo.svg'}
            />
          )
        })}
      </div>
    </Layout >
  )
}

export const getStaticProps = async () => {
  const data = await axios.get('https://axiomapi.herokuapp.com/users').then(res => {
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