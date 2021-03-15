import React, { useState } from 'react'
import SignatureContext from '../helpers/SignatureContext';
import Head from 'next/head';
import style from '../styles/SignaturePage.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import Form from '../components/Signature/Form';
import Signature from '../components/Signature/Signature';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import axios from 'axios';


export default function Home() {
  const [context, setContext] = useState("default context value");

  
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
                <Form />
              </div>
              <div className={style.right_column}>
                <Signature />
              </div>
            </section>
          </div>
         </Layout >
      </motion.div>
    </SignatureContext.Provider>
  )
}