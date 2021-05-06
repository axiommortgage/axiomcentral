import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import nookies from 'nookies'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { serializeJson } from '../../helpers/serializeData'
import Layout from '../../components/Layout'
import style from '../../styles/Printables.module.scss'

const Printable = (props) => {
  const { data } = props
  const [pdfInfo, setPdfInfo] = useState([])
  const viewer = useRef(null)

  const modifyPdf = async () => {
    const { url } = data[0].document
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: 100,
      size: 20,
      font: helveticaFont,
      color: rgb(0.51, 0.74, 0)
    })

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

  const data = await axios
    .get(`${apiURL}/printables?slug_eq=${ctx.params.slug}`, {
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

export default Printable
