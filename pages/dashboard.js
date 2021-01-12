import { parseCookies } from 'nookies';
import Layout from '../components/Layout';

const Dashboard = props => {

  return (
    <Layout>
      <h1>HEEEEEEY</h1>
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