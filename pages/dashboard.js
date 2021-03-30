import { useContext } from 'react';
import AuthContext from '../context/authContext';
import nookies from 'nookies';
import Layout from '../components/Layout';
import style from '../styles/Dashboard.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Card from '../components/Card';
import Markdown from '../components/Markdown';
import axios from 'axios';

const Dashboard = props => {
  return (
    <Layout>
      <h1 className={style.ax_page_title}>Dashboard</h1>
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

export const getServerSideProps = async ctx => {

  const API_URL = process.env.API_URL;

  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx);
    const jwt = tokens.jwt;
    const config = {
      headers: {
        Authorization: 'Bearer ' + jwt
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