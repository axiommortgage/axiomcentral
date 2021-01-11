import Head from 'next/head';
import Login from '../components/Login';

export default function Home() {
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
