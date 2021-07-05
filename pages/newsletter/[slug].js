import { useRef } from 'react'
import axios from 'axios'
import nookies from 'nookies'
import { serializeJson } from '../../helpers/serializeData'
import Layout from '../../components/Layout'
import style from '../../styles/Printables.module.scss'

const Newsletter = (props) => {
  const { newsletter } = props
  const viewer = useRef(null)

  console.log('NWLT', newsletter)

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Newsletter</h1>
      <iframe width="1000" height="2800" title="test-frame" src={newsletter[0].file.url} ref={viewer} type="application/pdf" />
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

  const newsletter = await axios
    .get(`${apiURL}/newsletter-archives?slug_eq=${ctx.params.slug}`, config)
    .then((res) => {
      const lenderData = serializeJson(res.data)
      return lenderData
    })
    .catch((error) => {
      throw error
    })

  return { props: { newsletter } }
}

export default Newsletter
