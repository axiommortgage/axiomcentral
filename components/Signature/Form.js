import { useState, useContext, useRef } from 'react'
import SignatureContext from '../../context/signatureContext'
import style from '../../styles/SignatureForm.module.scss'

const Form = (props) => {
  const { user } = props
  const form = useRef(null)

  // eslint-disable-next-line no-unused-vars
  const [context, setContext] = useContext(SignatureContext)
  // eslint-disable-next-line no-unused-vars
  const [processing, setProcessing] = useState(false)

  const generateSignature = (e) => {
    e.preventDefault()
    const info = form.current.children
    const infoArr = Array.from(info)

    let signatureData = user

    infoArr.forEach((i) => {
      const item = i.querySelector('input')
      const itemName = item.name
      let itemValue

      if (item.value) {
        itemValue = item.value
      } else {
        itemValue = ''
      }
      signatureData = { ...signatureData, [itemName]: itemValue }
    })

    setContext(signatureData)

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 300)
  }

  return (
    <>
      <form className={style.ax_form} onSubmit={(e) => generateSignature(e)} ref={form}>
        <div className={style.ax_field}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="aftername">Title After Name (e.g. AMP, BCC)</label>
          <input type="text" name="aftername" placeholder="AMP, BCC, BCO" />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="position">Position</label>
          <input
            type="text"
            name="position"
            placeholder="I.E: Mortgage Broker, BCS"
            defaultValue={user.position ? user.position : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="license">License Number (Optional)</label>
          <input
            type="text"
            name="license"
            placeholder="I.E: #AXM003333"
            defaultValue={user.license ? user.license : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="johndoe@axiom.ca" defaultValue={user.email ? user.email : ''} />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="phone">Phone (only numbers, no spaces)</label>
          <input type="tel" name="phone" placeholder="999-888-7777" defaultValue={user.phone ? user.phone : ''} />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            placeholder="I.E: https://axiommortgage.ca"
            defaultValue={user.website ? user.website : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="instagram">Instagram Page</label>
          <input
            type="text"
            name="instagram"
            placeholder="I.E: https://instagram.com/jane-doe"
            defaultValue={user.instagram ? user.instagram : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="facebook">Facebook Page</label>
          <input
            type="text"
            name="facebook"
            placeholder="I.E: https://facebook.com/jane-doe"
            defaultValue={user.facebook ? user.facebook : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="linkedin">Linkedin Page</label>
          <input
            type="text"
            name="linkedin"
            placeholder="I.E: https://linkedin.com/in/jane-doe"
            defaultValue={user.linkedin ? user.linkedin : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="twitter">Twitter Page</label>
          <input
            type="text"
            name="twitter"
            placeholder="I.E: https://twitter.com/jane-doe"
            defaultValue={user.twitter ? user.twitter : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="youtube">Youtube Channel</label>
          <input
            type="text"
            name="youtube"
            placeholder="I.E: https://youtube.com/c/jane-doe"
            defaultValue={user.youtube ? user.youtube : ''}
          />
        </div>

        <div className={style.ax_field}>
          <label htmlFor="applicationLink">Mortgage Application Link</label>
          <input
            type="text"
            name="applicationLink"
            placeholder="I.E: https://mtgapp.scarlettnetwork.com/broker-name/home"
            defaultValue={user.website ? user.website : ''}
          />
        </div>
      </form>
      <div className={style.ax_field}>
        <button className={style.ax_btn_submit} name="generate" type="submit" onClick={(e) => generateSignature(e)}>
          {processing ? <img src="/images/spinner-white.svg" alt="spinner" /> : ''}Generate Signature
        </button>
      </div>
    </>
  )
}

export default Form
