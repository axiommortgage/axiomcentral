import Layout from '../components/Layout';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import axios from 'axios';
import style from '../styles/Lenders.module.scss';
import alerts from '../styles/ToastsAlerts.module.scss';
import ScrollContainer from 'react-indiana-drag-scroll';
import nookies from 'nookies';

const AllLenders = props => {

  const lenders = props.lenders;
  const headers = ['Lender', 'Submission Agent/Agent Name', 'Set Up Requirements / Allowing for new broker sign ups', 'BDM', 'BDM Email', 'BDM Phone', 'Underwriter', 'Underwriter Email', 'Underwriter Phone', 'Portal Website', 'User ID', 'Password', 'Email Notifications', 'Documents', 'Notes'];
  console.log('LENDERS: ', lenders)

  const generateRows = () => {
    const filterLenders = lenders.map((row, index) => {
      let filteredObj = {};

      for (let col in row) {
        switch (col) {
          case 'name': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'submissionAgent': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'setupRequirements': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'bdmName': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'bdmEmail': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'bdmPhone': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'underwriterName': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'underwriterEmail': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'underwriterPhone': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'portalWebsite': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'userId': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'password': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'emailNotification': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'documents': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'notes': filteredObj = { ...filteredObj, [col]: row[col] }; break;
          case 'logo': filteredObj = { ...filteredObj, [col]: row[col] }; break;
        }
      }

      return filteredObj;
    });

    console.log(filterLenders)

    return (
      <>
        {filterLenders.map((item, index) => {

          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.submissionAgent}</td>
              <td>{item.setupRequirements}</td>
              <td>{item.bdmName}</td>
              <td>{item.bdmEmail}</td>
              <td>{item.bdmPhone}</td>
              <td>{item.underwriterName}</td>
              <td>{item.underwriterEmail}</td>
              <td>{item.underwriterPhone}</td>
              <td>{item.portalWebsite}</td>
              <td>{item.userId}</td>
              <td>{item.password}</td>
              <td>{item.emailNotification}</td>
              <td>{item.documents}</td>
              <td>{item.notes}</td>
            </tr>
          )

        })}
      </>
    )
  }

  let theRows = generateRows();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Layout>
        <h1 className={style.ax_page_title}>Lender Lounge</h1>
        <h3 className={alerts.ax_tip}>Click and Drag on the table to scroll horizontally.</h3>

        <ScrollContainer horizontal={true} vertical={false} className={style.lendersTable}>

          <table className={style.lendersTable} cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                {headers.map((item, index) => {
                  return (
                    <th key={index}>{item}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {theRows}
            </tbody>
          </table>
        </ScrollContainer>
      </Layout >
    </motion.div>
  )
}

const API_URL = `${process.env.API_URL}`;


export const getServerSideProps = async (ctx) => {

  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx);
    const jwt = tokens.jwt;
    const config = {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }

    const data = await axios.get(`${API_URL}/lenders`, config).then(res => {

      var lenders = res.data;
      return lenders;
    }).catch(err => {
      console.log(err)
    });

    return {
      props: {
        lenders: data
      }
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
}

export default AllLenders;