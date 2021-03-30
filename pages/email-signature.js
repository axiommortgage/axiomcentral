import React, { useState, useContext } from 'react'
import SignatureContext from '../context/signatureContext';
import { serializeJson } from '../helpers/serializeData';
import style from '../styles/SignaturePage.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Form from '../components/Signature/Form';
import Signature from '../components/Signature/Signature';
import SignatureWithPhoto from '../components/Signature/SignatureWithPhoto';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import axios from 'axios';
import nookies from 'nookies';

const EmailSignature = props => {
  const ctxVal = {
    username: '',
    email: '',
    aftername: '',
    address: '',
    license: '',
    phone: '',
    photo: '',
    applicationLink: '',
    firstname: '',
    lastname: '',
    position: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    whatsapp: '',
    fax: '',
    logoHeader: {
      url: ''
    },
    website: '',
  }



  const [context, setContext] = useState(ctxVal);
  const [photo, setPhoto] = useState(false);
  const [logo, setLogo] = useState(false);

  console.log('PROPS: ', props)

  const handlePhoto = () => {
    setPhoto(!photo);
  }

  const handleLogo = () => {
    setLogo(!logo);
  }

  return (
    <SignatureContext.Provider value={[context, setContext]}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Layout>
          <div className={style.ax_signature}>
            <h1 className={style.ax_page_title}>Axiom Signature Generator</h1>
            <p>The Axiom Email Signature Generator allows you to create your branded email signature in a HTML format. It means that you can have your website address and social media links clicables.</p>
            <h3 className={alerts.ax_tip}>Please make sure to include the <span>https://</span> prefix at the begining of any link.</h3>

            <section className={style.columns}>
              <div className={style.left_column}>
                <Form user={props.user} />
              </div>
              <div className={style.right_column}>
                {photo ? <SignatureWithPhoto user={props.user} logo={logo} /> : <Signature user={props.user} logo={logo} />}
                <div className={style.actions}>
                  <div><input type="checkbox" onChange={handlePhoto} />Show Photo?</div>
                  <div><input type="checkbox" onChange={handleLogo} />Show Logo?</div>
                </div>
              </div>
            </section>
          </div>
        </Layout >
      </motion.div>
    </SignatureContext.Provider>
  )
}

export const getServerSideProps = async ctx => {

  const API_URL = process.env.API_URL;
  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx);
    const jwt = tokens.jwt;
    const config = {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }

    const data = await axios.get(`${API_URL}/users/me`, config).then(res => {
      const { data } = res;
      const serializedData = serializeJson(data);
      return serializedData;

    }).catch(err => {
      console.log(err)
    });

    return {
      props: {
        user: data
      }
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

}

export default EmailSignature;