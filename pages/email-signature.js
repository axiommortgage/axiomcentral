import React, { useState, useContext } from 'react'
import SignatureContext from '../context/signatureContext';
import AuthContext from '../context/authContext';
import Head from 'next/head';
import style from '../styles/SignaturePage.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Form from '../components/Signature/Form';
import Signature from '../components/Signature/Signature';
import SignatureWithPhoto from '../components/Signature/SignatureWithPhoto';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import axios from 'axios';
import getJwt from '../helpers/formatCookie';


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
                <Form user={props.user}/>
              </div>
              <div className={style.right_column}>
                {photo ? <SignatureWithPhoto user={props.user} logo={logo}/> : <Signature user={props.user} logo={logo}/>}
                <div className={style.actions}>
                  <div><input type="checkbox" onChange={handlePhoto}/>Show Photo?</div>
                  <div><input type="checkbox" onChange={handleLogo}/>Show Logo?</div>
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

  const token = getJwt(ctx.req.headers.cookie);

  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }

  const data = await axios.get(`${API_URL}/users/me`, config ).then(res => {
    const {data} = res;
    const user = data;

    const replaceNulls = () => {          
      let serialized = {}
      for(let item in user){
        if(user[item] === null){
          serialized = {...serialized, [item]: ''}
        }else{
          serialized = {...serialized, [item]: user[item]}
        }        
      }
      return serialized;    
    }

    const serializedData = replaceNulls();
    return serializedData;

  }).catch(err => {
    console.log(err)
  });

  return {
    props: {
      user: data
    }  
  }

}

export default EmailSignature;