import nookies from 'nookies'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import style from '../styles/Dashboard.module.scss'
import Card from '../components/Card'

const Dashboard = () => {
  const router = useRouter()

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Dashboard</h1>
      <div className={style.ax_card_list}>
        {/* <Card
          iconSquared="./images/branding-icon.svg"
          title="Branding"
          description="Logos, graphics and guidelines"
          color="purple"
                    clickEvent={() => router.push('/branding')}

        /> */}
        <Card
          iconSquared="./images/technology-icon.svg"
          title="Technology"
          description="Tech, tools and more"
          color="blue"
          clickEvent={() => router.push('/technology')}
        />
        {/* <Card
          iconSquared="./images/events-icon.svg"
          title="Events"
          description="Upcoming and past Axiom events"
          color="orange"
          clickEvent={() => router.push('/events')}
        /> */}
        <Card
          iconSquared="./images/marketing-icon.svg"
          title="Marketing"
          description="Social, digital, print and more"
          color="yellow"
          clickEvent={() => router.push('/marketing')}
        />
        <Card
          iconSquared="./images/lender-icon.svg"
          title="Lender Lounge"
          description="Lenders contact information"
          color="green"
          clickEvent={() => router.push('/lender-lounge')}
        />
        {/* <Card
          iconSquared="./images/websites-icon.svg"
          title="Axiom Sites"
          description="Manage your axiom site data"
          color="teal"
          onClick={e => handleClick(e)}
        /> */}
      </div>
    </Layout>
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

    const data = await axios
      .get(`${API_URL}/notifications`, config)
      .then((res) => {
        const notifications = res.data
        return notifications
      })
      .catch((err) => {
        throw err
      })

    return {
      props: {
        notifications: data
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
