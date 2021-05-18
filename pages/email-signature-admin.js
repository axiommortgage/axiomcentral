import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import nookies from 'nookies'
import Cookies from 'js-cookie'
import SignatureContext from '../context/signatureContext'
import { serializeJson } from '../helpers/serializeData'
import style from '../styles/SignaturePage.module.scss'
import alerts from '../styles/ToastsAlerts.module.scss'
import Form from '../components/Signature/Form'
import Signature from '../components/Signature/Signature'
import SignatureWithPhoto from '../components/Signature/SignatureWithPhoto'
import Layout from '../components/Layout'

const EmailSignature = (props) => {
  const { user } = props

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
    website: ''
  }

  const [context, setContext] = useState(ctxVal)
  const [photo, setPhoto] = useState(false)
  const [logo, setLogo] = useState(false)
  const [searchEmail, setSearchEmail] = useState(null)
  const [signatureUser, setSignatureUser] = useState(null)
  const [validation, setValidation] = useState(null)
  const [validationMessage, setValidationMessage] = useState('')
  const [processing, setProcessing] = useState(false)

  const handlePhoto = () => {
    setPhoto(!photo)
  }

  const handleLogo = () => {
    setLogo(!logo)
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const fetchSignatureUser = async () => {
    setProcessing(true)
    const token = await Cookies.get('jwt')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const validateEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i

    if (validateEmail.test(String(searchEmail).toLowerCase())) {
      setValidation(true)
      const signatureUserData = await axios
        .get(`${API_URL}/users?email_eq=${searchEmail}`, config)
        .then((res) => {
          const { data } = res
          if (data.length === 0) {
            setValidationMessage('Email not found. Please insert a valid email.')
            setProcessing(false)
          } else {
            const serializedData = serializeJson(data)
            setSignatureUser(serializedData[0])
            setValidationMessage(`User: ${serializedData[0].firstname} ${serializedData[0].lastname}`)
            setProcessing(false)
            return serializedData
          }
        })
        .catch((err) => {
          setValidationMessage(
            'Ooops. Something went wrong. Please check if the entered email is correct or try again.'
          )
          setProcessing(false)
          setValidation(false)
          throw err
        })

      return signatureUserData
    }
    setValidation(false)
    setProcessing(false)
  }

  return (
    <SignatureContext.Provider value={[context, setContext]}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Layout>
          <div className={style.ax_signature}>
            <h1 className={style.ax_page_title}>Axiom Signature Generator</h1>
            <p>
              The Axiom Email Signature Generator allows you to create your branded email signature in a HTML format. It
              means that you can have your website address and social media links clicables.
            </p>
            <h3 className={alerts.ax_tip}>
              Please make sure to include the <span>https://</span> prefix at the begining of any link.
            </h3>

            <section className={style.columns}>
              <div className={style.left_column}>
                <div className={style.ax_field}>
                  <label htmlFor="aftername">Search Broker (by email)</label>
                  <div className={style.ax_search}>
                    <input
                      type="email"
                      placeholder="Broker registration e-mail"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <button type="button" onClick={fetchSignatureUser}>
                      {processing ? <img src="/images/spinner-white.svg" alt="spinner" /> : ''}Find User
                    </button>
                  </div>
                  <p>{validationMessage}</p>
                </div>

                <Form user={signatureUser !== null ? signatureUser : user} />
              </div>
              <div className={style.right_column}>
                {photo ? (
                  <SignatureWithPhoto user={signatureUser !== null ? signatureUser : user} logo={logo} />
                ) : (
                  <Signature user={signatureUser !== null ? signatureUser : user} logo={logo} />
                )}
                <div className={style.actions}>
                  <div>
                    <input type="checkbox" onChange={handlePhoto} />
                    Show Photo?
                  </div>
                  <div>
                    <input type="checkbox" onChange={handleLogo} />
                    Show Logo?
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Layout>
      </motion.div>
    </SignatureContext.Provider>
  )
}

export const getServerSideProps = async (ctx) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx)
    const { jwt } = tokens
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }

    const userData = await axios
      .get(`${API_URL}/users/me`, config)
      .then((res) => {
        const { data } = res
        const serializedData = serializeJson(data)
        return serializedData
      })
      .catch((err) => {
        throw err
      })

    return {
      props: {
        user: userData
      }
    }
  }
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

export default EmailSignature
