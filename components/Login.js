import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.scss';
import axios from 'axios';
import { setCookie } from 'nookies';

const Login = props => {
  const route = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    console.log('BTNNNNN')
    setProcessing(true);
    let loginInfo = {
      identifier: username,
      password: password
    }

    const API_URL = `${process.env.API_URL}/auth/local`;

    const data = axios.post(API_URL, loginInfo).then(res => {
      setProcessing(false);

      let jwt = res.data.jwt;

      setCookie(null, 'jwt', jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });

      return jwt;

    }).then(jwt => {
      route.push('/dashboard');

    }).catch(error => {
      setProcessing(false);
      console.log(error)
      route.push('/');
    });

    return data;

  }

  return (
    <section className={styles.ax_login}>
      <div className={styles.ax_login_left_column}></div>
      <div className={styles.ax_login_right_column}>
        <img src="./images/axiom-a-logo.svg" alt="Axiom Logo" />
        <form className={styles.ax_login_form}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" onChange={e => setUsername(e.target.value)}></input>

          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>

          <button type="submit" onClick={e => handleLogin(e)}>{processing ? <img src="/images/spinner-white.svg" /> : ''}Login</button>
        </form>
        <Link href="/">Forgot your password? Click here.</Link>
      </div>
    </section>
  )
}

export default Login;
