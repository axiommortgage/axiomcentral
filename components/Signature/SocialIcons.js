import { useContext } from 'react'
import SignatureContext from '../../context/signatureContext'

const SocialIcons = () => {
  const [context] = useContext(SignatureContext)

  return (
    <>
      {context.facebook ? (
        <td
          width="27"
          style={
            context.facebook !== null
              ? {
                  display: 'table-cell',
                  lineHeight: '22px',
                  height: '22px',
                  paddingBottom: '0',
                  marginBottom: '0',
                  paddingTop: '8px'
                }
              : { display: 'none' }
          }
        >
          <a
            style={{ width: '22px', height: '22px', marginLeft: '4px', textAlign: 'right' }}
            href={context.facebook === null ? '#' : context.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-facebook-green.png"
              width="22"
              height="22"
              alt=""
            />
          </a>
        </td>
      ) : (
        ''
      )}

      {context.instagram ? (
        <td
          width="27"
          style={
            context.instagram !== null
              ? {
                  display: 'table-cell',
                  lineHeight: '22px',
                  height: '22px',
                  paddingBottom: '0',
                  marginBottom: '0',
                  paddingTop: '8px'
                }
              : { display: 'none' }
          }
        >
          <a
            style={{ width: '22px', height: '22px', marginLeft: '4px', textAlign: 'right' }}
            href={context.instagram === null ? '#' : context.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-instagram-green.png"
              width="22"
              height="22"
              alt=""
            />
          </a>
        </td>
      ) : (
        ''
      )}

      {context.linkedin ? (
        <td
          width="27"
          style={
            context.linkedin !== null
              ? {
                  display: 'table-cell',
                  lineHeight: '22px',
                  height: '22px',
                  paddingBottom: '0',
                  marginBottom: '0',
                  paddingTop: '8px'
                }
              : { display: 'none' }
          }
        >
          <a
            style={{ width: '22px', height: '22px', marginLeft: '4px', textAlign: 'right' }}
            href={context.linkedin === null ? '#' : context.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-linkedin-green.png"
              width="22"
              height="22"
              alt=""
            />
          </a>
        </td>
      ) : (
        ''
      )}
      {context.twitter ? (
        <td
          width="27"
          style={
            context.twitter !== null
              ? {
                  display: 'table-cell',
                  lineHeight: '22px',
                  height: '22px',
                  paddingBottom: '0',
                  marginBottom: '0',
                  paddingTop: '8px'
                }
              : { display: 'none' }
          }
        >
          <a
            style={{ width: '22px', height: '22px', marginLeft: '4px', textAlign: 'right' }}
            href={context.twitter === null ? '#' : context.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-twitter-green.png"
              width="22"
              height="22"
              alt=""
            />
          </a>
        </td>
      ) : (
        ''
      )}
      {context.youtube ? (
        <td
          width="27"
          style={
            context.youtube !== null
              ? {
                  display: 'table-cell',
                  lineHeight: '22px',
                  height: '22px',
                  paddingBottom: '0',
                  marginBottom: '0',
                  paddingTop: '8px'
                }
              : { display: 'none' }
          }
        >
          <a
            style={{ width: '22px', height: '22px', marginLeft: '4px', textAlign: 'right' }}
            href={context.youtube === null ? '#' : context.youtube}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-youtube-green.png"
              width="22"
              height="22"
              alt=""
            />
          </a>
        </td>
      ) : (
        ''
      )}
    </>
  )
}

export default SocialIcons
