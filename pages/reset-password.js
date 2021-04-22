import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import style from '../styles/Password.module.scss';


const NewPassword = () => {

  const router = useRouter();
  const code = router.query.code;
  console.log(code)

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const ApiUrl = process.env.API_URL;

  const resetPassword = async e => {
    e.preventDefault();

    await axios.post(`${ApiUrl}/auth/reset-password`, {
      code: code, // code contained in the reset link of step 3.
      password: newPassword,
      passwordConfirmation: confirmNewPassword,
    }).then(res => {
      if (res.data.ok) {
        setStep('reset');
      }
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <section className={`${style.ax_section} ${style.ax_form_container}`}>
      <img src="/images/logo.svg" alt="axiom central logo" />
      <h1 className={style.ax_page_title}>Reset Password</h1>
      <form className={style.ax_form}>
        <p>Insert and confirm your new password.</p>
        <div className={style.ax_field}>
          <label htmlFor="password">New Password</label>
          <input type="password" name="password" onChange={e => setNewPassword(e.target.value)}></input>
        </div>
        <div className={style.ax_field}>
          <label htmlFor="passwordConfirmation">Confirm New Password</label>
          <input type="password" name="passwordConfirmation" onChange={e => setConfirmNewPassword(e.target.value)}></input>
        </div>
        <div className={style.ax_field}>
          <button className={style.ax_btn_submit} name="forgot" type="submit" onClick={e => resetPassword(e)} >Send</button>
        </div>
      </form>
    </section>
  )
}

export default NewPassword;