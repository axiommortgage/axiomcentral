import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '../components/Button';
import style from '../styles/Password.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import { UilEyeSlash, UilEye } from '@iconscout/react-unicons';


const NewPassword = () => {

  const router = useRouter();
  const code = router.query.code;
  console.log(code)

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [seeNew, setSeeNew] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);

  const ApiUrl = process.env.API_URL;

  const passValidation = () => {
    if (newPassword === confirmNewPassword) {
      setMessage('success');
      return true;
    } else {
      setMessage('error');
      return false;
    }
  }

  const resetPassword = async e => {
    e.preventDefault();

    const validation = passValidation();

    if (validation) {
      await axios.post(`${ApiUrl}/auth/reset-password`, {
        code: code, // code contained in the reset link of step 3.
        password: newPassword,
        passwordConfirmation: confirmNewPassword,
      }).then(res => {
        console.log(res);
        setMessage('success')
      }).catch(err => {
        console.log(err);
        setMessage('error')
      });
    }
  }

  const showMessage = () => {
    switch (message) {
      case 'success': {
        return (
          <div className={alerts.ax_tip}>
            <p>Your password has been reset successfuly.</p>
            <Button isLink linkPath='/' label="Go to Login" size="medium" />
          </div>
        )
      }
      case 'error': {
        return (
          <div className={alerts.ax_tip_error}>
            <p>Passwords doesn't match.</p>
          </div>
        )
      }

      default: return '';
    }
  }

  const response = showMessage();

  const seePassword = (e, field) => {
    e.preventDefault();

    if (field === 'new') {
      setSeeNew(!seeNew)
    }
    if (field === 'confirm') {
      setSeeConfirm(!seeConfirm)
    }
  }

  return (
    <section className={`${style.ax_section} ${style.ax_form_container}`}>
      <img src="/images/logo.svg" alt="axiom central logo" />
      <h1 className={style.ax_page_title}>Reset Password</h1>
      <form className={style.ax_form}>
        <p>Insert and confirm your new password.</p>
        <div className={style.ax_field}>
          <label htmlFor="password">New Password</label>
          {seeNew ?
            <input type="text" name="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}></input>
            :
            <input type="password" name="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}></input>
          }
          <button className={style.see} onClick={e => seePassword(e, 'new')}>{seeNew ? <UilEye /> : <UilEyeSlash />}</button>
        </div>
        <div className={style.ax_field}>
          <label htmlFor="passwordConfirmation">Confirm New Password</label>
          {seeConfirm ?
            <input type="text" name="passwordConfirmation" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}></input>
            :
            <input type="password" name="passwordConfirmation" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}></input>
          }
          <button className={style.see} onClick={e => seePassword(e, 'confirm')}>{seeConfirm ? <UilEye /> : <UilEyeSlash />}</button>
        </div>
        <div className={style.ax_field}>
          <button className={style.ax_btn_submit} name="forgot" type="submit" onClick={e => resetPassword(e)} >Send</button>
        </div>
      </form>
      {response}
    </section>
  )
}

export default NewPassword;