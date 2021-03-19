import { parseCookies } from 'nookies';
import Layout from '../components/Layout';
import getJwt from '../helpers/formatCookie';
import style from '../styles/Dashboard.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Card from '../components/Card';
import axios from 'axios';


const Dashboard = props => {
  const {techs} = props;

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Technology</h1>
      <h3 className={alerts.ax_tip}>Find the best softwares in the industry accordingly with your need.</h3>

      <div className={style.ax_card_list}>
      {techs.map((tech, index) => {
        return(<Card hasButton={true} buttonLabel={`Go to ${tech.title}`} icon={tech.logo.url} title={tech.title} description={tech.description} isLink={true} linkUrl={tech.link} openInBlank={true}/>) 
      })}        
      </div>
    </Layout>
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
  const data = await axios.get(`${API_URL}/technologies`, config).then(res => {
    var techs = res.data;
    return techs;
  }).catch(err => {
    console.log(err)
  });

  return {
    props: {
      techs: data
    }
  }
}

export default Dashboard;