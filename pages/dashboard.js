import { parseCookies } from 'nookies';
import Layout from '../components/Layout';
import style from '../styles/Dashboard.module.scss';
import Card from '../components/Card';

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

export const getServerSideProps = async (ctx) => {

  let jwt = parseCookies(ctx).jwt;

  if (!jwt) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    }
  }
  return {
    props: {

    }
  }
}

export default Dashboard;