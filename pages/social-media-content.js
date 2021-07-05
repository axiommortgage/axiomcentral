import { useState } from 'react'
import nookies from 'nookies'
import axios from 'axios'
import Moment from 'react-moment'
import { UilFolder } from '@iconscout/react-unicons'
import Layout from '../components/Layout'
import style from '../styles/Marketing.module.scss'
import SocialPostsList from '../components/SocialPosts/SocialPostsList'

const Marketing = (props) => {
  const { posts, user } = props
  const [content, setContent] = useState({})  

  const showContent = (e, i) => {
    setContent(i)
  }

  const userPosts = () => {
    let postsArr = []
    posts.filter((p) =>
      p.socialPosts.map((item) => {
        if (item.alberta && user.team.province === 'alberta') {
          postsArr = [...postsArr, item]
        }
      })
    )
    return postsArr
  }

  const postItem = (item) => (
    <li key={item.id}>
      <button type="button" onClick={(e) => showContent(e, item)}>
        <Moment format="DD">{item.postDate}</Moment> - {item.title}
      </button>
    </li>
  )

  return (
    <>
      <Layout>
        <h1 className={style.ax_page_title}>Social media content</h1>
        <div className={style.contentContainer}>
          {posts ? (
            <ul className={style.listColumn}>
              {posts.map((p) => {
                let counter = 0
                p.socialPosts.forEach((sp) => {
                  if (sp.all) {
                    counter++
                  }
                  if (sp.alberta && user.team.province === 'alberta' ) {
                    counter++
                  }
                  if (sp.britishColumbia && user.team.province === 'britishColumbia') {
                    counter++
                  }
                  if (sp.manitoba && user.team.province === 'manitoba') {
                    counter++
                  }
                  if (sp.newBrunswick && user.team.province === 'newBrunswick') {
                    counter++
                  }
                  if (sp.newFoundlandAndLabrador && user.team.province === 'newFoundlandAndLabrador') {
                    counter++
                  }
                  if (sp.northwestTerritories && user.team.province === 'northwestTerritories') {
                    counter++
                  }
                  if (sp.novaScotia && user.team.province === 'novaScotia') {
                    counter++
                  }
                  if (sp.nunavut && user.team.province === 'nunavut') {
                    counter++
                  }
                  if (sp.ontario && user.team.province === 'ontario') {
                    counter++
                  }
                  if (sp.princeEdwardIsland && user.team.province === 'princeEdwardIsland') {
                    counter++
                  }
                  if (sp.quebec && user.team.province === 'quebec') {
                    counter++
                  }
                  if (sp.saskatchewan && user.team.province === 'saskatchewan') {
                    counter++
                  }
                  if (sp.yukon && user.team.province === 'yukon') {
                    counter++
                  }
                })
                return (
                  <li key={p.id}>
                    <button role="button">
                      <UilFolder /> <Moment format="MMMM Y">{p.month}</Moment>
                      <span>({counter})</span>
                    </button>

                    <ul>
                      {p.socialPosts.map((item) => {
                        if (item.all) {
                          return postItem(item)
                        }
                        if (item.alberta && user.team.province === 'alberta') {
                          return postItem(item)
                        }
                        if (item.britishColumbia && user.team.province === 'britishColumbia') {
                          return postItem(item)
                        }
                        if (item.manitoba && user.team.province === 'manitoba') {
                          return postItem(item)
                        }
                        if (item.newBrunswick && user.team.province === 'newBrunswick') {
                          return postItem(item)
                        }
                        if (item.newFoundlandAndLabrador && user.team.province === 'newFoundlandAndLabrador') {
                          return postItem(item)
                        }
                        if (item.northwestTerritories && user.team.province === 'northwestTerritories') {
                          return postItem(item)
                        }
                        if (item.novaScotia && user.team.province === 'novaScotia') {
                          return postItem(item)
                        }
                        if (item.nunavut && user.team.province === 'nunavut') {
                          return postItem(item)
                        }
                        if (item.ontario && user.team.province === 'ontario') {
                          return postItem(item)
                        }
                        if (item.princeEdwardIsland && user.team.province === 'princeEdwardIsland') {
                          return postItem(item)
                        }
                        if (item.quebec && user.team.province === 'quebec') {
                          return postItem(item)
                        }
                        if (item.saskatchewan && user.team.province === 'saskatchewan') {
                          return postItem(item)
                        }
                        if (item.yukon && user.team.province === 'yukon') {
                          return postItem(item)
                        }
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          ) : (
            'loading'
          )}
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

    return {
      props: {
        posts,
        user
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
