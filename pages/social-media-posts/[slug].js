import axios from 'axios'
import nookies from 'nookies'
import Canvas from '../../components/SocialPosts/Canvas'
import { serializeJson } from '../../helpers/serializeData'
import Layout from '../../components/Layout'
import style from '../../styles/Printables.module.scss'

const SocialPost = (props) => {
  const { posts, user } = props

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Social Media Posts</h1>
      <Canvas posts={posts} user={user} />
    </Layout>
  )
}

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const getServerSideProps = async (ctx) => {
  const tokens = nookies.get(ctx)
  const token = tokens.jwt
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const posts = await axios
    .get(`${apiURL}/social-posts?slug_eq=${ctx.params.slug}`, config)
    .then((res) => {
      const postData = serializeJson(res.data)
      return postData
    })
    .catch((error) => {
      throw error
    })

  const user = await axios
    .get(`${apiURL}/users/me`, config)
    .then((res) => {
      const me = res.data
      return me
    })
    .catch((err) => {
      throw err
    })

  return { props: { user, posts } }
}

export default SocialPost
