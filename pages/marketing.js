import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Card from '../components/Card'
import style from '../styles/Marketing.module.scss'

const Marketing = (props) => {
  const router = useRouter()

  return (
    <Layout>
      <h1 className={style.ax_page_title}>Marketing</h1>
      <div className={style.ax_card_list}>
        <Card
          icon="./images/social-media-icon.svg"
          title="Social Media Posts"
          description="Find images for posting on your social media networks"
          color="yellow"
          clickEvent={() => router.push('/social-media-content')}
        />
        <Card
          icon="./images/printables-icon.svg"
          title="Printables"
          description="Find printables documents, PDFs and others"
          color="yellow"
          clickEvent={() => router.push('/printables')}
        />

        <Card
          icon="./images/email-signature-icon.svg"
          title="Email Signature"
          description="Generate your email signature with clickable links"
          color="yellow"
          clickEvent={() => router.push('/email-signature')}
        />
      </div>
    </Layout>
  )
}

export default Marketing
