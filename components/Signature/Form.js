import SignatureContext from '../../context/signatureContext';
import AuthContext from '../../context/authContext';
import { useState, useContext, useRef } from 'react';
import style from '../../styles/SignatureForm.module.scss';

const Form = props => {
  const {user} = props;
  const form = useRef(null);

  let fieldsInfo = {
    name: '',
    aftername: '',
    position: '',
    license: '',
    email: '',
    phone: '',
    brokerage: '',
    website: '',
    applicationLink: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    logoHeader: {
      url: ''
    }
  };

  const [formInfo, setFormInfo] = useState(fieldsInfo);
  const [context, setContext] = useContext(SignatureContext);
  const [processing, setProcessing] = useState(false);
  const {userAuth} = useContext(AuthContext);


  const generateSignature = e => {
    e.preventDefault();
    let info = form.current.children;
    let infoArr = Array.from(info);

    let signatureData = props.user;

    for (let i in infoArr) {
      let item = infoArr[i].querySelector('input');
      console.log(item)
      let itemName = item.name;
      let itemValue;

      if (item.value) {
        itemValue = item.value;
      } else {
        itemValue = '';
      }
      signatureData = { ...signatureData, [itemName]: itemValue }

    }
    setContext(signatureData);

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300)

  }

  return (
    <>
    <form className={style.ax_form} onSubmit={e => generateSignature(e)} ref={form}>
      <div className={style.ax_field}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Name" defaultValue={`${user.firstname} ${user.lastname}`}  ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="aftername">Title After Name (e.g. AMP, BCC)</label>
        <input type="text" name="aftername" placeholder="AMP, BCC, BCO" ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="position">Position</label>
        <input type="text" name="position" placeholder="I.E: Mortgage Broker, BCS" defaultValue={user.position} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="license">License Number (Optional)</label>
        <input type="text" name="license" placeholder="I.E: #AXM003333" defaultValue={user.license ? user.license : ''}></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="johndoe@axiom.ca" defaultValue={user.email} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="phone">Phone (only numbers, no spaces)</label>
        <input type="tel" name="phone" placeholder="999-888-7777" defaultValue={user.phone} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="website">Website</label>
        <input type="text" name="website" placeholder="I.E: https://axiommortgage.ca" defaultValue={user.website ? user.website : ''} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="instagram">Instagram Page</label>
        <input type="text" name="instagram" placeholder="I.E: https://instagram.com/jane-doe" defaultValue={user.instagram ? user.instagram : ''} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="facebook">Facebook Page</label>
        <input type="text" name="facebook" placeholder="I.E: https://facebook.com/jane-doe" defaultValue={user.facebook ? user.facebook : ''} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="linkedin">Linkedin Page</label>
        <input type="text" name="linkedin" placeholder="I.E: https://linkedin.com/in/jane-doe" defaultValue={user.linkedin ? user.linkedin : ''} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="twitter">Twitter Page</label>
        <input type="text" name="twitter" placeholder="I.E: https://twitter.com/jane-doe" defaultValue={user.twitter ? user.twitter : ''} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="youtube">Youtube Channel</label>
        <input type="text" name="youtube" placeholder="I.E: https://youtube.com/c/jane-doe" defaultValue={user.youtube ? user.youtube : ''} ></input>
      </div>

      <div className={style.ax_field}>
        <label htmlFor="applicationLink">Mortgage Application Link</label>
        <input type="text" name="applicationLink" placeholder="I.E: https://mtgapp.scarlettnetwork.com/broker-name/home" defaultValue={user.website ? user.website : ''} ></input>
      </div>            
    </form >
    <div className={style.ax_field}>
      <button className={style.ax_btn_submit} name="generate" type="submit" onClick={e => generateSignature(e)} >{processing ? <img src="/images/spinner-white.svg" /> : ''}Generate Signature</button>
    </div> 
    </>
  )
}

export default Form;