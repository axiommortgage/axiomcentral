import nookies from 'nookies'
import axios from 'axios'
import Layout from '../components/Layout'

import { serializeArray } from '../helpers/serializeData'
import style from '../styles/Dashboard.module.scss'
import alerts from '../styles/ToastsAlerts.module.scss'
import Card from '../components/Card'

const Dashboard = (props) => {
  const { techs } = props

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Technology</h1>
      <h3 className={alerts.ax_tip}>Find the best softwares in the industry accordingly with your need.</h3>

      <div className={style.ax_card_list}>
        {techs.map((tech) => (
          <Card
            key={tech.title}
            hasButton
            buttonLabel={`Go to ${tech.title}`}
            icon={tech.logo.url}
            title={tech.title}
            description={tech.description}
            isLink
            linkUrl={tech.link}
            openInBlank
          />
        ))}
      </div>
    </Layout>
  )
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getServerSideProps = async (ctx) => {
  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx)
    const { jwt } = tokens
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
    const techData = await axios
      .get(`${API_URL}/technologies`, config)
      .then((res) => {
        const { data } = res
        const serializedData = serializeArray(data)
        return serializedData
      })
      .catch((err) => {
        throw err
      })

    return {
      props: {
        techs: techData
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

export default Dashboard
