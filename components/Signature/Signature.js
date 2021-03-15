import SignatureContext from '../../helpers/SignatureContext';
import { useContext, useRef } from 'react';
import SocialIcons from './SocialIcons';
import style from '../../styles/Signature.module.scss';

const Signature = props => {

  const signatureHTML = useRef(null);

  const [context, setContext] = useContext(SignatureContext);

  const networks = () => {
    const socials = ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube'];
    let socialNets = {};

    for (let social in context) {
      socials.filter(item => {

        if (item === social) {
          socialNets = { ...socialNets, [social]: context[social] }
        }
      })
    }
    return socialNets
  }

  let socialNetworks = networks();


  //Copying HTML Email Signature
  const copyHtml = (e) => {
    e.preventDefault();
    const signature = signatureHTML.current;
    var range = document.createRange();
    range.selectNode(signature);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
  }





  return (
    <>
      <table className={style.ax_signature} width="540" border="0" cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif !important' }} ref={signatureHTML}>
        <tbody>
          <tr>
            <td width="200" style={{ borderRight: '1px solid #84bd00', verticalAlign: 'top' }}>
              <h1 style={{ fontFamily: 'Arial, sans-serif !important', fontSize: '21px', lineHeight: '24px', color: '#000000', margin: '18px 0 4px 0' }}>{context.name},<span style={{ fontSize: '12px' }}> {context.aftername}</span></h1>
              <h4 style={{ fontFamily: 'Arial, sans-serif !important', fontSize: '14px', lineHeight: '18px', color: '#84bd00', margin: '0 0 16px 0' }}>{context.position}<span></span></h4>
              <a href={context.applicationLink} style={{ padding: '4px 8px', borderRadius: '2px', margin: '0 0 24px 0', background: '#000', cursor: 'pointer', color: '#ffffff', textDecoration: 'none', fontSize: '14px' }}>Apply Now</a>
            </td>

            <td width="320" style={{ verticalAlign: 'top', paddingTop: '8px' }}>

              <a href={`tel:${context.phone === null ? '#' : context.phone}`}
                style={context.phone === null ? { display: 'none' } : { color: '#000000', fontSize: '15px', paddingLeft: '4px', lineHeight: '24px', display: 'block', textDecoration: 'none', margin: '8px 0 4px 16px' }}>
                <img src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-phone-green.png"
                  style={{ verticalAlign: 'middle' }} />
                {context.phone === null ? '-----' : context.phone}</a>

              <a href={`mailto:${context.email === null ? '#' : context.email}`}
                style={context.email === null ? { display: 'none' } : { color: '#000000', fontSize: '15px', paddingLeft: '4px', lineHeight: '24px', display: 'block', textDecoration: 'none', margin: '0 0 4px 16px' }}>
                <img src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-email-green.png"
                  style={{ verticalAlign: 'middle' }} />
                {context.email === null ? '-----' : context.email}</a>

              <a href={context.website === null ? '#' : context.website} target="_blank"
                style={context.website === null ? { display: 'none' } : { color: '#000000', fontSize: '15px', paddingLeft: '4px', lineHeight: '24px', display: 'block', textDecoration: 'none', margin: '0 0 16px 16px' }}>
                <img src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-website-green.png"
                  style={{ verticalAlign: 'middle' }} />
                {context.website === null ? '-----' : context.website}</a>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ paddingTop: '15px' }}></td>
          </tr>
          <tr>
            <td style={{ borderTop: '1px solid #84bd00' }}>
              <img src="http://brand.axiommortgage.ca/assets/email-signatures/images/2021/axiom-mortgage-logo-horizontal.png"
                alt={context.brokerage} />
            </td>
            <td width="320" style={{ verticalAlign: 'top', borderTop: '1px solid #84bd00' }}>
              <table width="320" height="52" border="0" cellPadding="0" cellSpacing="0"
                style={{ textAlign: 'right', margin: '0 0 0 10px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '100px' }}></td>
                    <SocialIcons networks={socialNetworks} />
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <button className={style.ax_btn_copy} onClick={e => copyHtml(e)}>Copy Signature</button>
    </>
  )
}

export default Signature;