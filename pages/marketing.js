import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import nookies from 'nookies'
import axios from 'axios'
import Calendar from 'react-calendar'
import Layout from '../components/Layout'
import style from '../styles/Marketing.module.scss'

const Marketing = (props) => {
  const { posts, user, team } = props
  const [value, onChange] = useState(new Date())
  const route = useRouter()
  const [loading, setLoading] = useState(false)

  const formattedDate = (date) =>
    date.toLocaleDateString('en-CA', {
      // you can use undefined as first argument
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

  const tileAction = (date) => {
    let path
    posts.forEach((post) => {
      if (post.date === formattedDate(date)) {
        path = post.slug
      }
    })
    setLoading(true)
    route.push(`/social-media-posts/${path}`)
  }

  const tileContent = ({ date }) => {
    let title
    posts.forEach((post) => {
      if (post.date === formattedDate(date)) {
        title = <p>{post.title}</p>
      }
    })
    return title
  }

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Marketing</h1>
      <h3 className={style.ax_page_subtitle}>Social media posts</h3>
      <div className={style.calendarContainer}>
        {loading ? (
          <div className={style.boxedLoading}>
            <img src="./images/spinner-white.svg" alt="loading" />
          </div>
        ) : (
          ''
        )}
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={tileAction}
          tileContent={tileContent}
          tileClassName={style.day}
          className={style.calendar}
          view="month"
        />
      </div>
    </Layout>
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
      .get(`${API_URL}/social-posts`, config)
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
