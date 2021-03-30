import { parseCookies } from 'nookies';
import Layout from '../components/Layout';
import nookies from 'nookies';
import { serializeArray } from '../helpers/serializeData';
import style from '../styles/Dashboard.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Card from '../components/Card';
import axios from 'axios';


const Dashboard = props => {
  const { techs } = props;
  console.log(techs);

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Technology</h1>
      <h3 className={alerts.ax_tip}>Find the best softwares in the industry accordingly with your need.</h3>

      <div className={style.ax_card_list}>
        {techs.map((tech, index) => {
          return (<Card hasButton={true} buttonLabel={`Go to ${tech.title}`} icon={tech.logo.url} title={tech.title} description={tech.description} isLink={true} linkUrl={tech.link} openInBlank={true} />)
        })}
      </div>
    </Layout>
  )
}

const API_URL = `${process.env.API_URL}`;

export const getServerSideProps = async (ctx) => {


  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx);
    const jwt = tokens.jwt;
    const config = {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }
    const data = await axios.get(`${API_URL}/technologies`, config).then(res => {
      const { data } = res;
      const serializedData = serializeArray(data);
      console.log('SSS', serializedData);
      return serializedData;

    }).catch(err => {
      console.log(err)
    });

    return {
      props: {
        techs: data
      }
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default Dashboard;