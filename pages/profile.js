import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import nookies from 'nookies'
import Cookies from 'js-cookie'
import { serializeJson } from '../helpers/serializeData'
import Layout from '../components/Layout'
import Toast from '../components/Toast'
import style from '../styles/Profile.module.scss'

const Profile = (props) => {
  const { user } = props
  const photoName = typeof user.photo !== 'undefined' ? `${user.photo.hash}${user.photo.ext}` : ''
  const photoUrl = `https://res.cloudinary.com/axiom-mortgage/image/upload/w_250,h_250,q_100,c_fill,g_face/${photoName}`

  const apiUrl = process.env.API_URL

  const form = useRef(null)
  const [formInfo, setFormInfo] = useState(user)
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const updateInfo = (e) => {
    e.preventDefault()
    const { name } = e.target
    const { value } = e.target

    setFormInfo({ ...formInfo, [name]: value })
  }

  const updateUser = async (e) => {
    e.preventDefault()
    setSpinner(true)
    const token = Cookies.get('jwt')

    await axios
      .put(`${apiUrl}/users/${user.id}`, formInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setSpinner(false)
        setMessage('success')
        setIsVisible(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      })
      .catch((err) => {
        setSpinner(false)
        setMessage('error')
        setIsVisible(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
        throw err
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <Toast
          showToast={isVisible}
          toastType={message}
          message={
            message === 'success'
              ? 'Your profile has been updated successfuly!'
              : 'Ooops. Something went wrong. Please try again.'
          }
        />
        <h1 className={style.ax_page_title}>Your Profile</h1>

        <section className={style.ax_content}>
          <div className={style.ax_left_column}>
            <img src={photoUrl} alt={user.fiestname} />
            <div className={style.ax_info}>
              <h3>
                {user.firstname} {user.lastname}
              </h3>
              <p>{user.brokerage}</p>
            </div>
          </div>
          <div className={style.ax_right_column}>
            <div className={style.content_left}>
              <h3>Edit Your Info</h3>
              <p>All the data changed will reflect automatically on your Axiom Website.</p>
              <form className={style.ax_form} ref={form}>
                <div className={style.ax_field}>
                  <label htmlFor="name">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Name"
                    defaultValue={user.firstname}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="name">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    defaultValue={user.lastname}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="aftername">Title After Name (e.g. AMP, BCC)</label>
                  <input
                    type="text"
                    name="aftername"
                    id="aftername"
                    placeholder="AMP, BCC, BCO"
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    placeholder="I.E: Mortgage Broker, BCS"
                    defaultValue={user.position}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="license">License Number (Optional)</label>
                  <input
                    type="text"
                    name="license"
                    id="license"
                    placeholder="I.E: #AXM003333"
                    defaultValue={user.license ? user.license : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="johndoe@axiom.ca"
                    defaultValue={user.email}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="phone">Phone (only numbers, no spaces)</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="999-888-7777"
                    defaultValue={user.phone}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    placeholder="I.E: https://axiommortgage.ca"
                    defaultValue={user.website ? user.website : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="instagram">Instagram Page</label>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    placeholder="I.E: https://instagram.com/jane-doe"
                    defaultValue={user.instagram ? user.instagram : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="facebook">Facebook Page</label>
                  <input
                    type="text"
                    name="facebook"
                    id="facebook"
                    placeholder="I.E: https://facebook.com/jane-doe"
                    defaultValue={user.facebook ? user.facebook : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="linkedin">Linkedin Page</label>
                  <input
                    type="text"
                    name="linkedin"
                    id="linkedin"
                    placeholder="I.E: https://linkedin.com/in/jane-doe"
                    defaultValue={user.linkedin ? user.linkedin : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="twitter">Twitter Page</label>
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    placeholder="I.E: https://twitter.com/jane-doe"
                    defaultValue={user.twitter ? user.twitter : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="youtube">Youtube Channel</label>
                  <input
                    type="text"
                    name="youtube"
                    id="youtube"
                    placeholder="I.E: https://youtube.com/c/jane-doe"
                    defaultValue={user.youtube ? user.youtube : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>

                <div className={style.ax_field}>
                  <label htmlFor="applicationLink">Mortgage Application Link</label>
                  <input
                    type="text"
                    name="applicationLink"
                    id="applicationLink"
                    placeholder="I.E: https://mtgapp.scarlettnetwork.com/broker-name/home"
                    defaultValue={user.website ? user.website : ''}
                    onChange={(e) => updateInfo(e)}
                  />
                </div>
              </form>
              <div className={style.ax_field}>
                <button className={style.ax_btn_submit} name="generate" type="submit" onClick={(e) => updateUser(e)}>
                  {spinner ? <img src="/images/spinner-white.svg" alt="spinner" /> : ''}Update Info
                </button>
              </div>
            </div>
            {/* <div className={style.content_right}>

            </div> */}
          </div>
        </section>
      </Layout>
    </motion.div>
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

export default Profile
