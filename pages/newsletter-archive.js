import nookies from 'nookies'
import axios from 'axios'
import Moment from 'react-moment'
import Layout from '../components/Layout'
import Card from '../components/Card'
import { serializeJson } from '../helpers/serializeData'
import style from '../styles/Printables.module.scss'

const Newsletters = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { data } = props

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Newsletters</h1>
      <div className={style.ax_card_list}>
        {Object.keys(data).map((print) => (
          <Card
            key={data[print].id}
            title={data[print].title}
            date={data[print].date}            
            hasButton
            linkUrl={`/newsletter/${data[print].slug}`}
            iconSquared="./images/ico-pdf.svg"
            buttonLabel="See Newsletter"
          />
        ))}
      </div>
    </Layout>
  )
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getServerSideProps = async (ctx) => {
  const tokens = nookies.get(ctx)
  const { jwt } = tokens
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }

  const allNewsletters = await axios
    .get(`${API_URL}/newsletter-archives`, config)
    .then((res) => {
      const { data } = res
      const serializedData = serializeJson(data)
      return serializedData
    })
    .catch((err) => {
      throw err
    })
  return {
    props: { data: allNewsletters }
  }
}

export default Newsletters
