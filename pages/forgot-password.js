import { useState } from 'react';
import axios from 'axios';
import style from '../styles/Password.module.scss';

const NewPassword = () => {

  const [userEmail, setUserEmail] = useState('');

  const ApiUrl = process.env.API_URL;

  const forgotPassword = async e => {
    e.preventDefault();

    await axios.post(`${ApiUrl}/auth/forgot-password`, {
      email: userEmail
    }).then(res => {
      if (res.data.ok) {
        setStep('reset');
      }
    }).catch(err => {
      console.log(err.response);
    });
  }

  return (
    <section className={`${style.ax_section} ${style.ax_form_container}`}>
      <img src="/images/logo.svg" alt="axiom central logo" />
      <h1 className={style.ax_page_title}>Forgot Password</h1>
      <form className={style.ax_form}>
        <p>Please insert your registration email and click on Send button. You'll receive an email with instructions on how to reset your password.</p>
        <div className={style.ax_field}>
          <label htmlFor="email">Your Registration Email</label>
          <input type="email" name="email" placeholder="Email" onChange={e => setUserEmail(e.target.value)}></input>
        </div>
        <div className={style.ax_field}>
          <button className={style.ax_btn_submit} name="forgot" type="submit" onClick={e => forgotPassword(e)} >Send</button>
        </div>
      </form>
    </section>
  )
}

export default NewPassword;