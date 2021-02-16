import { useState, useRef } from 'react';
import { parseCookies } from 'nookies';
import Layout from '../components/Layout';
import axios from 'axios';
import { motion } from 'framer-motion';
import Processing from '../components/Processing';
import style from '../styles/AddBroker.module.scss';


const AddBroker = props => {
  const form = useRef(null);
  const [processing, setProcessing] = useState({ isProcessing: false, message: '' });
  const [toast, setToast] = useState({ toastType: '', showToast: true, message: '' });


  const setUserInfo = () => {
    //Fetching all needed fields except upload fields
    return new Promise((res, rej) => {
      const currForm = form.current;
      let names = currForm.elements;
      let info = {};

      const inputsNeeded = ['username', 'email', 'password', 'firstname', 'lastname', 'brokerage', 'applicationLink', 'position', 'address', 'bioTitle', 'bio', 'license', 'phone', 'mapEmbedSrc', 'facebook', 'instagram', 'linkedin', 'twitter', 'youtube'];

      for (let n in names) {
        const fieldVal = names[n].value;
        const fieldName = names[n].name;

        inputsNeeded.filter(i => {
          if (i === fieldName) {
            info = { ...info, [fieldName]: fieldVal };
          }
        });
      }
      res(info);
    });
  }


  const handleForm = async (e) => {
    e.preventDefault();

    setProcessing({
      isProcessing: true,
      message: 'Registering New Broker'
    });

    //retrieving JWT Token
    let token = await props.jwt;
    let config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    //Defining broker info
    let finalBrokerInfo = await setUserInfo();

    //Registering broker Info
    const data = await axios.post(`http://localhost:1337/auth/local/register`, finalBrokerInfo, config)
      .then(res => {
        return res.data.user.id;
      }).then(async refId => {

        //Adding User Images
        const currForm = await form.current;
        let names = await currForm.elements;
        const fieldsData = Array.from(names);
        const data = new FormData();
        data.append('refId', refId);
        data.append('ref', 'user');
        data.append('source', 'users-permissions');

        fieldsData.filter(field => {
          if (field.name === 'photo' || field.name === 'logoHeader2') {
            if (field.name === 'photo') {
              data.append('field', 'photo');
              const photo = field.files[0];
              data.append('files', photo, photo.name);

            }
          }
        });

        return { fieldsData, data, refId };

      }).then(async data => {
        //Uploading Photo
        const formData = data.data;
        const refId = data.refId;
        const fieldsData = data.fieldsData;
        const uploadPhoto = await axios.post('http://localhost:1337/upload', formData);
        return { fieldsData, refId }

      }).then(async data => {
        //Uploading Broker Logo if Cobranded
        const fieldsData = data.fieldsData;

        fieldsData.filter(field => {
          if (field.name === 'logoHeader2') {
            if (field.files.length > 0) {
              const formData = new FormData();
              const refId = data.refId;
              formData.append('refId', refId);
              formData.append('ref', 'user');
              formData.append('source', 'users-permissions');
              formData.append('field', 'logoHeader2');
              const logoHeader2 = field.files[0];
              formData.append('files', logoHeader2, logoHeader2.name);

              return axios.post('http://localhost:1337/upload', formData)
            }
          } else {
            return;
          }
        });

        return fieldsData;

      }).then(data => {
        data.forEach(field => {
          field.value = '';
        });
        setProcessing({
          isProcessing: false,
          message: ''
        });
        setToast({
          toastType: 'success',
          message: 'Yay! A new Broker has been added.',
          showToast: true
        });
        console.log('Register finished!')
      }).catch(error => {
        setToast({
          toastType: 'error',
          message: 'Ooops! Something went wrong. Please check if you missed any information on the form below.',
          showToast: true
        });
      });

    return data;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Layout showToast={toast.showToast} message={toast.message} toastType={toast.toastType}>
        <h1 className={style.ax_page_title}>Add Broker</h1>

        <form className={`${style.ax_add_broker_form} ${style.ax_form}`} ref={form} onSubmit={e => handleForm(e)}>
          <Processing processing={processing.isProcessing} message={processing.message} />

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
            <label htmlFor="logoHeader2">Broker's brokerage Logo</label>
            <small>Your brokerage logo that should be placed along with Powered By Axiom Logo.</small>
            <input type="file" name="logoHeader2" ></input>
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
    </motion.div>
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
      jwt
    }
  }
}

export default AddBroker;