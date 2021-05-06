import nookies from 'nookies'
import axios from 'axios'
import Layout from '../components/Layout'
import Card from '../components/Card'
import { serializeJson } from '../helpers/serializeData'
import style from '../styles/Printables.module.scss'

const Printables = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { data } = props

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Printables</h1>
      {Object.keys(data).map((print) => (
        <Card
          key={data[print].id}
          title={data[print].title}
          description={data[print].description}
          hasButton
          linkUrl={`/printable/${data[print].slug}`}
          icon="./images/ico-pdf.svg"
          buttonLabel="See Printable"
        />
      ))}
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

  const allPrintables = await axios
    .get(`${API_URL}/printables`, config)
    .then((res) => {
      const { data } = res
      const serializedData = serializeJson(data)
      return serializedData
    })
    .catch((err) => {
      throw err
    })
  return {
    props: { data: allPrintables }
  }
}

export default Printables
