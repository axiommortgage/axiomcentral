import { parseCookies } from 'nookies';
import getJwt from '../helpers/formatCookie';
import Layout from '../components/Layout';
import style from '../styles/Dashboard.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Card from '../components/Card';
import Markdown from '../components/Markdown';
import axios from 'axios';

const Dashboard = props => {
  const {notifications} = props;
  console.log('N: ', notifications)
  return (
    <Layout>
      <h1 className={style.ax_page_title}>Dashboard</h1>
      <div className={alerts.ax_tip}>
      {notifications.map((item, index) => {
        return(
          <>
            <h3>{item.title}</h3>
            <Markdown>{item.content}</Markdown>
          </>
        )
      })}
      </div>
      <div className={style.ax_card_list}>
        <Card iconSquared="./images/branding.svg" title="Branding" description="Logos, graphics and guidelines" />
        <Card iconSquared="./images/technology.svg" title="Technology" description="Tech, tools and more" />
        <Card iconSquared="./images/insurance.svg" title="Insurance" description="Life, Home and Auto Insurance" />
        <Card iconSquared="./images/events.svg" title="Events" description="Upcoming and past Axiom events" />
        <Card iconSquared="./images/marketing.svg" title="Marketing" description="Social, digital, print and more" />
        <Card iconSquared="./images/lenders.svg" title="Lender Lounge" description="Lenders contact information" />
        <Card iconSquared="./images/websites.svg" title="Axiom Sites" description="Manage your axiom site data" />
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
  const data = await axios.get(`${API_URL}/notifications`, config).then(res => {
    var notifications = res.data;
    return notifications;
  }).catch(err => {
    console.log(err)
  });

  
  return {
    props: {
      notifications: data
    }
  }
}

export default Dashboard;