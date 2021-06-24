import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import axios from 'axios'
// import Calendar from 'react-calendar'
import Moment from 'react-moment'
import Modal from 'react-modal'
import { UilFolder } from '@iconscout/react-unicons'
import Layout from '../components/Layout'
import Processing from '../components/Processing'
import style from '../styles/Marketing.module.scss'
import SocialPostsList from '../components/SocialPosts/SocialPostsList'

const Marketing = (props) => {
  const { posts, user, team } = props
  // const [value, onChange] = useState(new Date())
  const route = useRouter()
  const [expand, setExpand] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState({})
  const [content, setContent] = useState({})

  const expandable = useRef(null)

  const customStyles = {
    content: {
      width: '65%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  const handleModal = (e, i) => {
    setModalContent(i)
    setModal(!modal)
  }

  const showContent = (e, i) => {
    setContent(i)
  }

  const closeModal = () => {
    setModal(!modal)
  }

  const handleExpand = (e) => {
    setExpand(!expand)
  }

  return (
    <>
      <Modal isOpen={modal} contentLabel="Example Modal" style={customStyles}>
        <h1>{modalContent.title}</h1>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </Modal>
      <Layout>
        <h1 className={style.ax_page_title}>Social media content</h1>
        <div className={style.contentContainer}>
          <ul className={style.listColumn}>
            {posts.map((p) => (
              <li>
                <button role="button" onClick={(e) => handleExpand(e)} ref={expandable}>
                  <UilFolder /> <Moment format="MMMM Y">{p.month}</Moment>
                </button>
                <ul>
                  {p.socialPosts.map((item) => (
                    <li>
                      <button type="button" onClick={(e) => showContent(e, item)}>
                        <Moment format="DD">{item.postDate}</Moment> - {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <section className={style.contentColumn}>
            {content.postImages ? <SocialPostsList posts={content.postImages} /> : ''}
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx)
    const { jwt, userId } = tokens
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }

    const posts = await axios
      .get(`${API_URL}/social-posts?_sort=month:DESC`, config)
      .then((res) => {
        const postList = res.data
        return postList
      })
      .catch((err) => {
        throw err
      })

    const user = await axios
      .get(`${API_URL}/users/${userId}`, config)
      .then((res) => {
        const userData = res.data
        return userData
      })
      .catch((err) => {
        throw err
      })

    const team = await axios
      .get(`${API_URL}/teams`, config)
      .then((res) => {
        const teamData = res.data
        return teamData
      })
      .catch((err) => {
        throw err
      })

    return {
      props: {
        posts,
        user,
        team
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

export default Marketing
