import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import nookies from 'nookies'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { serializeJson } from '../../helpers/serializeData'
import Layout from '../../components/Layout'
import style from '../../styles/Printables.module.scss'

const Printable = (props) => {
  const { printable, user } = props
  const [pdfInfo, setPdfInfo] = useState([])
  const viewer = useRef(null)

  const modifyPdf = async () => {
    const { contactPosition } = printable[0]
    const { url } = printable[0].document
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const lastPage = pages.length - 1
    const infoPage = pages[lastPage]
    const { width, height } = infoPage.getSize()

    const formatPhone = (phone) => `${phone.slice(0, 3)}.${phone.slice(3, 6)}.${phone.slice(6, 10)}`
    const formatedPhone = formatPhone(user.phone)

    const itemPosition = (item, position) => {
      console.log('PRT', position)
      if (item === 'title') {
        switch (position) {
          case 'columnRight':
            return {
              x: width - 192,
              y: 78,
              size: 12,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          case 'bottomLeft':
            return {
              x: 25,
              y: 78,
              size: 12,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          default:
            return {
              x: 25,
              y: 78,
              size: 12,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
        }
      }

      if (item === 'name') {
        switch (position) {
          case 'columnRight':
            return {
              x: width - 192,
              y: 60,
              size: 12,
              font: helveticaFont,
              color: rgb(0.51, 0.74, 0)
            }
          case 'bottomLeft':
            return {
              x: 25,
              y: 60,
              size: 12,
              font: helveticaFont,
              color: rgb(0.51, 0.74, 0)
            }
          default:
            return {
              x: 25,
              y: 60,
              size: 12,
              font: helveticaFont,
              color: rgb(0.51, 0.74, 0)
            }
        }
      }

      if (item === 'email') {
        switch (position) {
          case 'columnRight':
            return {
              x: width - 192,
              y: 48,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          case 'bottomLeft':
            return {
              x: 25,
              y: 48,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          default:
            return {
              x: 25,
              y: 48,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
        }
      }

      if (item === 'phone') {
        switch (position) {
          case 'columnRight':
            return {
              x: width - 192,
              y: 35,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          case 'bottomLeft':
            return {
              x: 25,
              y: 35,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          default:
            return {
              x: 25,
              y: 35,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
        }
      }

      if (item === 'website') {
        switch (position) {
          case 'columnRight':
            return {
              x: width - 192,
              y: 24,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          case 'bottomLeft':
            return {
              x: 25,
              y: 24,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
          default:
            return {
              x: 25,
              y: 24,
              size: 10,
              font: helveticaFont,
              color: rgb(1, 1, 1)
            }
        }
      }
    }

    infoPage.drawText('Have questions? Contact us.', itemPosition('title', contactPosition))
    infoPage.drawText(`${user.firstname} ${user.lastname}`, itemPosition('name', contactPosition))
    infoPage.drawText(user.email, itemPosition('email', contactPosition))
    infoPage.drawText(formatedPhone, itemPosition('phone', contactPosition))
    infoPage.drawText(user.website ? user.website : 'axiommortgage.ca', itemPosition('website', contactPosition))

    const pdfBytes = await pdfDoc.save()

    const bytes = new Uint8Array(pdfBytes)
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const docUrl = URL.createObjectURL(blob)
    setPdfInfo(docUrl)

    return pdfBytes
  }

  useEffect(() => {
    modifyPdf()
  }, [])

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Printables</h1>
      <iframe width="1000" height="2800" title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />
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

  const printable = await axios
    .get(`${apiURL}/printables?slug_eq=${ctx.params.slug}`, config)
    .then((res) => {
      const lenderData = serializeJson(res.data)
      return lenderData
    })
    .catch((error) => {
      throw error
    })

  const user = await axios
    .get(`${apiURL}/users/me`, config)
    .then((res) => {
      const me = res.data
      return me
    })
    .catch((err) => {
      throw err
    })

  return { props: { user, printable } }
}

export default Printable
