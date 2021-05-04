import { useState } from 'react';
import axios from 'axios';
import style from '../styles/Password.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';

const NewPassword = () => {

  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [spinner, setSpinner] = useState(false);

  const ApiUrl = process.env.API_URL;

  const forgotPassword = async e => {
    e.preventDefault();
    setSpinner(true);

    await axios.post(`${ApiUrl}/auth/forgot-password`, {
      email: userEmail
    }).then(res => {
      console.log(res);
      if (res.data.ok) {
        setMessage('success');
        setSpinner(false);
      }
    }).catch(err => {
      setMessage('error');
      console.log(err);
      setSpinner(false);
    });
  }

  const showMessage = () => {
    switch (message) {
      case 'success': {
        return (
          <div className={alerts.ax_tip}>
            <p>Please check your email for more instructions on how to reset your password.</p>
          </div>
        )
      }
      case 'error': {
        return (
          <div className={alerts.ax_tip_error}>
            <p>The informed email doesn't exist in our database. Please inform your registration email.</p>
          </div>
        )
      }

      default: return '';
    }
  }

  const response = showMessage();

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
          <button className={style.ax_btn_submit} name="forgot" type="submit" onClick={e => forgotPassword(e)} >{spinner ? <img src="/images/spinner-white.svg" /> : ''}Send</button>
        </div>
      </form>
      {response}
    </section>
  )
}

export default NewPassword;