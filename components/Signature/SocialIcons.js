import SignatureContext from '../../context/signatureContext';
import { useContext, useState } from 'react';

const SocialIcons = props => {
  const [context, setContext] = useContext(SignatureContext);

  return (
    <>
    
    {context.facebook ? 
      <td width="27" style={context.facebook !== null ? { display: 'table-cell' } : { display: 'none' }}>
        <a style={{ width: '22px', marginLeft: '4px', textAlign: 'right' }} href={context.facebook === null ? '#' : context.facebook}
          target="_blank"><img
            src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-facebook-green.png"
            width="22" height="22" alt="" /></a>
      </td>
    : ''}

    {context.instagram ? 
      <td width="27" style={context.instagram !== null ? { display: 'table-cell' } : { display: 'none' }}>
        <a style={{ width: '22px', marginLeft: '4px', textAlign: 'right' }} href={context.instagram === null ? '#' : context.instagram}
          target="_blank"><img
            src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-instagram-green.png"
            width="22" height="22" alt="" /></a>
      </td>
    : ''}

    {context.linkedin ?
      <td width="27" style={context.linkedin !== null ? { display: 'table-cell' } : { display: 'none' }}>
        <a style={{ width: '22px', marginLeft: '4px', textAlign: 'right' }} href={context.linkedin === null ? '#' : context.linkedin}
          target="_blank"><img
            src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-linkedin-green.png"
            width="22" height="22" alt="" /></a>
      </td>
    : ''}
    {context.twitter ?
      <td width="27" style={context.twitter !== null ? { display: 'table-cell' } : { display: 'none' }}>
        <a style={{ width: '22px', marginLeft: '4px', textAlign: 'right' }} href={context.twitter === null ? '#' : context.twitter}
          target="_blank"><img
            src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-twitter-green.png"
            width="22" height="22" alt="" /></a>
      </td>
    : ''}
    {context.youtube ?
      <td width="27" style={context.youtube !== null ? { display: 'table-cell' } : { display: 'none' }}>
        <a style={{ width: '22px', marginLeft: '4px', textAlign: 'right' }} href={context.youtube === null ? '#' : context.youtube}
          target="_blank"><img
            src="https://brand.axiommortgage.ca/assets/email-signatures/images/2021/ico-youtube-green.png"
            width="22" height="22" alt="" /></a>
      </td>
    : ''}
    </>

  )
}


export default SocialIcons;