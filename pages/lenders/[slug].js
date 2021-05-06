import axios from 'axios'
import nookies from 'nookies'
import { serializeJson } from '../../helpers/serializeData'
import Layout from '../../components/Layout'
import style from '../../styles/Lenders.module.scss'

const Lender = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const lender = props.data[0]

  return (
    <Layout>
      <section className={style.ax_post_title}>
        <h1 className={style.ax_page_title}>{lender.name}</h1>
      </section>
      <section className={style.ax_post_info}>
        <div className={style.ax_post_details}>
          <img src={lender.logo.url} className={style.logo} alt="logo" />

          <div className={style.col}>
            <p>
              <strong>Name: </strong>
              {lender.name}
            </p>
            <p>
              <strong>Submission Agent: </strong>
              {lender.submissionAgent}
            </p>
            <p>
              <strong>Setup Requirements: </strong>
              {lender.setupRequirements}
            </p>
            <p>
              <strong>BDM Name: </strong>
              {lender.bdmName}
            </p>
            <p>
              <strong>BDM Email: </strong>
              {lender.bdmEmail}
            </p>
            <p>
              <strong>BDM Phone: </strong>
              {lender.bdmPhone}
            </p>
          </div>

          <div className={style.col}>
            <p>
              <strong>Underwriter Name: </strong>
              {lender.underwriterName}
            </p>
            <p>
              <strong>Underwriter Email: </strong>
              {lender.underwriterEmail}
            </p>
            <p>
              <strong>Underwriter Phone: </strong>
              {lender.underwriterPhone}
            </p>
            <p>
              <strong>Portal Website: </strong>
              {lender.portalWebsite}
            </p>
            <p>
              <strong>User ID: </strong>
              {lender.userId}
            </p>
            <p>
              <strong>Password: </strong>
              {lender.password}
            </p>
          </div>

          <div className={style.col}>
            <p>
              <strong>Email Notification: </strong>
              {lender.emailNotification}
            </p>
            <p>
              <strong>Documents: </strong>
              {lender.documents}
            </p>
            <p>
              <strong>Notes: </strong>
              {lender.notes}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const getServerSideProps = async (ctx) => {
  const tokens = nookies.get(ctx)
  const token = tokens.jwt

  const data = await axios
    .get(`${apiURL}/lenders?slug_eq=${ctx.params.slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const lenderData = serializeJson(res.data)
      return lenderData
    })
    .catch((error) => {
      throw error
    })

  return { props: { data } }
}

export default Lender
