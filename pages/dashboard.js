import { parseCookies } from 'nookies';
import { Router } from 'next/router';
import { route } from 'next/dist/next-server/server/router';

const Dashboard = props => {

  return (
    <>
      <nav>
        Navbar
        </nav>
      <aside>
        Sidebar
        </aside>
      <main>
        Main
        </main>
    </>
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