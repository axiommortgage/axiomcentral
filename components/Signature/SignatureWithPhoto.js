import { useContext, useRef, useState } from 'react'
import SignatureContext from '../../context/signatureContext'
import AuthContext from '../../context/authContext'
import SocialIcons from './SocialIcons'
import style from '../../styles/Signature.module.scss'
import Toast from '../Toast'

const Signature = (props) => {
  const signatureHTML = useRef(null)
  const [processing, setProcessing] = useState(false)
  const [context] = useContext(SignatureContext)
  // const { userAuth } = useContext(AuthContext)

  const { user } = props
  const photoName = typeof user.photo !== 'undefined' ? `${user.photo.hash}${user.photo.ext}` : ''
  const photoUrl = `https://res.cloudinary.com/axiom-mortgage/image/upload/w_120,h_120,q_100,c_fill,g_face,e_improve,r_max,e_sharpen,bo_2px_solid_black/${photoName}`

  const logoName =
    typeof context.logoHeader !== 'undefined' ? `${context.logoHeader.hash}${context.logoHeader.ext}` : ''
  const logoUrl = `https://res.cloudinary.com/axiom-mortgage/image/upload/w_130,q_100/${logoName}`

  const networks = () => {
    const socials = ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube']
    let socialNets = {}

    Object.keys(context).forEach((social) => {
      socials.filter((item) => {
        if (item === social) {
          socialNets = { ...socialNets, [social]: context[social] }
        }
        return socialNets
      })
    })
    return socialNets
  }

  const socialNetworks = networks()

  const formatPhone = () => {
    const { phone } = context
    return `${phone.slice(0, 3)}.${phone.slice(3, 6)}.${phone.slice(6, 10)}`
  }

  const formatedPhone = formatPhone()

  //Copying HTML Email Signature
  const copyHtml = (e) => {
    e.preventDefault()
    setProcessing(true)
    const signature = signatureHTML.current
    const range = document.createRange()
    range.selectNode(signature)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    setTimeout(() => {
      setProcessing(false)
    }, 3000)
  }

  const { logo } = props

  return (
    <>
      <table
        className={style.ax_signature}
        width="540"
        border="0"
        cellPadding="0"
        cellSpacing="0"
        style={{ fontFamily: 'Arial, sans-serif !important' }}
        ref={signatureHTML}
      >
        <tbody>
          <tr>
            <td colSpan="2">
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td width="150" style={{ borderRight: '1px solid #84bd00', verticalAlign: 'top' }}>
                      <p>
                        {' '}
                        <img src={photoUrl} alt="broker" />
                      </p>
                      {logo && context.logoHeader && context.logoHeader.url ? (
                        <p style={{ width: '200px' }}>
                          <img
                            src={logoUrl}
                            style={{ verticalAlign: 'middle', marginBottom: '5px', width: '130px' }}
                            alt="logo"
                          />
                        </p>
                      ) : (
                        ''
                      )}
                      <a
                        href={context.applicationLink}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '2px',
                          margin: '0 0 24px 0',
                          background: '#000',
                          cursor: 'pointer',
                          color: '#ffffff',
                          textDecoration: 'none',
                          fontSize: '14px',
                          marginLeft: '18px'
                        }}
                      >
                        Apply Now
                      </a>
                    </td>

                    <td width="370" style={{ verticalAlign: 'top', paddingTop: '8px' }}>
                      <h1
                        style={{
                          fontFamily: 'Arial, sans-serif !important',
                          fontSize: '21px',
                          lineHeight: '24px',
                          color: '#000000',
                          margin: '0 0 0 20px'
                        }}
                      >
                        {context.name}
                        {context.aftername.length > 0 ? ', ' : ''}
                        <span style={{ fontSize: '12px' }}>
                          {context.aftername.length > 0 ? context.aftername : ''}
                        </span>
                      </h1>
                      <h4
                        style={{
                          fontFamily: 'Arial, sans-serif !important',
                          fontSize: '14px',
                          lineHeight: '18px',
                          color: '#84bd00',
                          margin: '0 0 16px 20px'
                        }}
                      >
                        {context.position}
                        <span />
                      </h4>

                      {context.phone.length > 0 ? (
                        <a
                          href={`tel:${context.phone === null ? '#' : context.phone}`}
                          style={
                            context.phone === null
                              ? { display: 'none' }
                              : {
                                  color: '#000000',
                                  fontSize: '15px',
                                  paddingLeft: '4px',
                                  lineHeight: '24px',
                                  height: '24px',
                                  display: 'block',
                                  textDecoration: 'none',
                                  margin: '8px 0 4px 16px'
                                }
                          }
                        >
                          <img
                            src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-phone-green.png"
                            style={{ verticalAlign: 'middle' }}
                            alt="phone icon"
                          />
                          {context.phone === null ? '-----' : formatedPhone}
                        </a>
                      ) : (
                        ''
                      )}

                      {context.email.length > 0 ? (
                        <a
                          href={`mailto:${context.email === null ? '#' : context.email}`}
                          style={
                            context.email === null
                              ? { display: 'none' }
                              : {
                                  color: '#000000',
                                  fontSize: '15px',
                                  paddingLeft: '4px',
                                  lineHeight: '24px',
                                  height: '24px',
                                  display: 'block',
                                  textDecoration: 'none',
                                  margin: '0 0 4px 16px'
                                }
                          }
                        >
                          <img
                            src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-email-green.png"
                            style={{ verticalAlign: 'middle', marginRight: '2px' }}
                            alt="email icon"
                          />
                          {context.email === null ? '-----' : context.email}
                        </a>
                      ) : (
                        ''
                      )}

                      {context.website.length > 0 && context.website !== '#' ? (
                        <a
                          href={context.website === null ? '#' : context.website}
                          target="_blank"
                          style={
                            context.website === null
                              ? { display: 'none' }
                              : {
                                  color: '#000000',
                                  fontSize: '15px',
                                  paddingLeft: '4px',
                                  lineHeight: '24px',
                                  height: '24px',
                                  display: 'block',
                                  textDecoration: 'none',
                                  margin: '0 0 4px 16px'
                                }
                          }
                          rel="noreferrer"
                        >
                          <img
                            src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-website-green.png"
                            style={{ verticalAlign: 'middle' }}
                            alt="website icon"
                          />
                          {context.website === null ? '-----' : context.website}
                        </a>
                      ) : (
                        ''
                      )}

                      {context.license ? (
                        <p
                          style={{
                            fontSize: '12px',
                            paddingLeft: '8px',
                            lineHeight: '24px',
                            display: 'block',
                            textDecoration: 'none',
                            margin: '0 0 16px 16px'
                          }}
                        >
                          License {context.license}
                        </p>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ paddingTop: '15px' }} />
          </tr>
          <tr>
            <td style={{ borderTop: '1px solid #84bd00' }}>
              <img
                src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/axiom-mortgage-logo-horizontal.png"
                alt={context.brokerage}
              />
            </td>
            <td width="320" style={{ verticalAlign: 'top', borderTop: '1px solid #84bd00' }}>
              <table
                width="320"
                height="32"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                style={{ textAlign: 'right', margin: '0 0 0 10px' }}
              >
                <tbody>
                  <tr>
                    <td style={{ width: '100px' }} />
                    <SocialIcons networks={socialNetworks} />
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" className={style.ax_btn_copy} onClick={(e) => copyHtml(e)}>
        Copy Signature
      </button>

      <Toast
        showToast={processing}
        toastType="success"
        message="Your signature was copied to clipboard. Paste it on your signature area."
      />
    </>
  )
}

export default Signature
