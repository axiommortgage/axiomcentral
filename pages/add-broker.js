import { useState, useRef } from 'react';
import { parseCookies } from 'nookies';
import Layout from '../components/Layout';
import axios from 'axios';
import style from '../styles/AddBroker.module.scss'


const AddBroker = props => {
  const [brokerInfo, setBrokerInfo] = useState('');
  const form = useRef(null);

  const handleForm = async (e) => {
    e.preventDefault();

    const currForm = form.current;
    let names = currForm.querySelectorAll('input');
    let info = {};
    const inputsNeeded = ['username', 'email', 'password', 'firstname', 'lastname', 'brokerage', 'applicationLink', 'position', 'address', 'bioTitle', 'bio', 'license', 'phone', 'mapEmbedSrc', 'facebook', 'instagram', 'linkedin', 'twitter', 'youtube']

    for (let n in names) {
      const fieldVal = names[n].value;
      const fieldName = names[n].name;

      inputsNeeded.filter(i => {
        if (i === fieldName) {
          info = { ...info, [fieldName]: fieldVal };
          setBrokerInfo(info)
        }
      })
    }

    let config = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2ZiMzNlZjhhNzc5MDAxNzk1ZjQ2NSIsImlhdCI6MTYxMTA4NjQ5NywiZXhwIjoxNjEzNjc4NDk3fQ.4VdZrcaBEuBF9SrxVO3JJdEyKqXpd8i2e-CjQC5mLes'
      }
    }

    let finalBrokerInfo = brokerInfo;


    const data = await axios.post(`http://localhost:1337/auth/local/register`, finalBrokerInfo, config).then(res => {
      console.log(res);
      return userdata;
    }).catch(error => {
      console.log(error)
    });

    return data;
  }

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Add Broker</h1>
      <form className={`${style.ax_add_broker_form} ${style.ax_form}`} ref={form} onSubmit={e => handleForm(e)}>
        <div className={style.ax_field}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="firstname">First Name</label>
          <input type="text" name="firstname" placeholder="First Name" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" name="lastname" placeholder="Last Name" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="position">Position</label>
          <input type="text" name="position" placeholder="I.E: Mortgage Broker, BCS" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="license">License Number</label>
          <input type="text" name="license" placeholder="I.E: #AXM003333" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="bioTitle">About (Bio) Text Title</label>
          <input type="text" name="bioTitle" placeholder="About Text Title" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="bio">About (Bio) Text</label>
          <textarea name="bio" rows="6" />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="brokerage">Brokerage</label>
          <input type="text" name="brokerage" placeholder="I.E: Axiom Mortgage Solutions" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="address">Work/Office Address</label>
          <input type="text" name="address" placeholder="Address" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="instagram">Instagram Page</label>
          <input type="text" name="instagram" placeholder="I.E: https://instagram.com/jane-doe" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="facebook">Facebook Page</label>
          <input type="text" name="facebook" placeholder="I.E: https://facebook.com/jane-doe" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="linkedin">Linkedin Page</label>
          <input type="text" name="linkedin" placeholder="I.E: https://linkedin.com/in/jane-doe" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="twitter">Twitter Page</label>
          <input type="text" name="twitter" placeholder="I.E: https://twitter.com/jane-doe" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="youtube">Youtube Channel</label>
          <input type="text" name="youtube" placeholder="I.E: https://youtube.com/c/jane-doe" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="applicationLink">Mortgage Application Link</label>
          <input type="text" name="applicationLink" placeholder="I.E: https://mtgapp.scarlettnetwork.com/broker-name/home" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="photo">Photo</label>
          <input type="file" name="photo" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="mapEmbedSrc">Map Embed Link</label>
          <input type="text" name="mapEmbedSrc" placeholder="I.E: https://mtgapp.scarlettnetwork.com/broker-name/home" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="hasLogo2">Is Cobranded?</label>
          <small>Check below if the website should show 2 logos, the broker's Logo along with Powered By Axiom Logo.</small>
          <input type="checkbox" name="hasLogo2" ></input>
        </div>

        <div className={style.ax_field}>
          <label htmlFor="whatsapp">Enable WhatsApp Contact?</label>
          <small>Check below to make a WhatsApp button show up on the website and connect to the informed phone.</small>
          <input type="checkbox" name="whatsapp" ></input>
        </div>

        <div className={style.ax_field}>
          <input type="submit" value="Create Broker" ></input>
        </div>

      </form >
    </Layout >
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

export default AddBroker;