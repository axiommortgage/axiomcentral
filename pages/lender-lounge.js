import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import ScrollContainer from 'react-indiana-drag-scroll'
import nookies from 'nookies'
import { UilListUl, UilApps } from '@iconscout/react-unicons'
import alerts from '../styles/ToastsAlerts.module.scss'
import style from '../styles/Lenders.module.scss'
import Card from '../components/Card'
import Layout from '../components/Layout'

const AllLenders = (props) => {
  const [view, setView] = useState('list')

  const { lenders } = props
  const headers = [
    'Lender',
    'Submission Agent/Agent Name',
    'Set Up Requirements / Allowing for new broker sign ups',
    'BDM',
    'BDM Email',
    'BDM Phone',
    'Underwriter',
    'Underwriter Email',
    'Underwriter Phone',
    'Portal Website',
    'User ID',
    'Password',
    'Email Notifications',
    'Documents',
    'Notes'
  ]

  const generateRows = () => {
    const filterLenders = lenders.map((row) => {
      let filteredObj = {}

      Object.keys(row).forEach((col) => {
        switch (col) {
          case 'name':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'submissionAgent':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'setupRequirements':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'bdmName':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'bdmEmail':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'bdmPhone':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'underwriterName':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'underwriterEmail':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'underwriterPhone':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'portalWebsite':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'userId':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'password':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'emailNotification':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'documents':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'notes':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          case 'logo':
            filteredObj = { ...filteredObj, [col]: row[col] }
            break
          default:
            ''
        }
      })

      return filteredObj
    })

    return (
      <>
        {filterLenders.map((item) => (
          <tr key={item.name}>
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
        ))}
      </>
    )
  }

  const theRows = generateRows()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <h1 className={style.ax_page_title}>Lender Lounge</h1>
        <h3 className={alerts.ax_tip}>Click and Drag on the table to scroll horizontally.</h3>
        <div className={style.ax_toggle_view}>
          <button
            type="button"
            className={`${style.ax_list_view} ${view === 'list' ? style.active : ''}`}
            onClick={() => setView('list')}
          >
            <UilListUl /> List
          </button>
          <button
            type="button"
            className={`${style.ax_card_view} ${view === 'cards' ? style.active : ''}`}
            onClick={() => setView('cards')}
          >
            <UilApps /> Cards
          </button>
        </div>
        {view === 'list' ? (
          <ScrollContainer horizontal vertical={false} className={style.lendersTable}>
            <table className={style.lendersTable} cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  {headers.map((item) => (
                    <th key={item.name}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{theRows}</tbody>
            </table>
          </ScrollContainer>
        ) : (
          <div className={style.ax_card_view}>
            {lenders.map((item) => (
              <Card
                key={item.name}
                icon={item.logo.url}
                title={item.name}
                hasButton
                linkUrl={`lenders/${item.slug}`}
                buttonLabel="See Info"
              />
            ))}
          </div>
        )}
      </Layout>
    </motion.div>
  )
}

const API_URL = `${process.env.API_URL}`

export const getServerSideProps = async (ctx) => {
  if (ctx.req.headers.cookie) {
    const tokens = nookies.get(ctx)
    const { jwt } = tokens
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }

    const data = await axios
      .get(`${API_URL}/lenders`, config)
      .then((res) => {
        const lenders = res.data
        return lenders
      })
      .catch((err) => {
        throw err
      })

    return {
      props: {
        lenders: data
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

export default AllLenders
