import axios from "axios";
import { serializeJson } from '../../helpers/serializeData';
import Layout from '../../components/Layout';
import Avatar from '../../components/Avatar';
import style from '../../styles/Lenders.module.scss';

const Lender = props => {
  const lender = props.data[0];

  return (
    <Layout>
      <section className={style.ax_post_title}>
        <Avatar photoUrl={lender.logo.url} size={100} />
        <h1 className={style.ax_page_title}>{lender.name}</h1>
      </section>
      <section className={style.ax_post_info}>
        <div className={style.ax_post_details}>

          <div className={style.col}>
            <p><strong>Name: </strong>{lender.name}</p>
            <p><strong>Submission Agent: </strong>{lender.submissionAgent}</p>
            <p><strong>Setup Requirements: </strong>{lender.setupRequirements}</p>
            <p><strong>BDM Name: </strong>{lender.bdmName}</p>
            <p><strong>BDM Email: </strong>{lender.bdmEmail}</p>
            <p><strong>BDM Phone: </strong>{lender.bdmPhone}</p>
          </div>

          <div className={style.col}>
            <p><strong>Underwriter Name: </strong>{lender.underwriterName}</p>
            <p><strong>Underwriter Email: </strong>{lender.underwriterEmail}</p>
            <p><strong>Underwriter Phone: </strong>{lender.underwriterPhone}</p>
            <p><strong>Portal Website: </strong>{lender.portalWebsite}</p>
            <p><strong>User ID: </strong>{lender.userId}</p>
            <p><strong>Password: </strong>{lender.password}</p>
          </div>

          <div className={style.col}>
            <p><strong>Email Notification: </strong>{lender.emailNotification}</p>
            <p><strong>Documents: </strong>{lender.documents}</p>
            <p><strong>Notes: </strong>{lender.notes}</p>
          </div>

        </div>
      </section>
    </Layout>
  )
}

const apiURL = process.env.API_URL;


export async function getStaticPaths() {

  const res = await axios.get(`${apiURL}/lenders`);
  const lenders = res.data;

  const paths = lenders.map(lender => `/lenders/${lender.slug}`)
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {

  const data = await axios.get(`${apiURL}/lenders?slug_eq=${params.slug}`).then(res => {
    const lenderData = serializeJson(res.data);
    return lenderData;

  }).catch(error => {
    console.log(error)
  });

  return { props: { data } };
}

export default Lender;