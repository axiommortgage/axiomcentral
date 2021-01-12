import Head from 'next/head';
import Login from '../components/Login';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

const Home = props => {

  return (
    <div>
      <Head>
        <title>Axiom Central</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <main>

        <Login />

      </main>

    </div >
  )
}

export const getServerSideProps = async (ctx) => {

  let auth = parseCookies(ctx).jwt;

  if (auth) {
  }
  return {
    props: {

    }
  }
}

export default Home;