import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import Draggable from 'react-draggable'
import style from '../../styles/SocialPosts.module.scss'

const Canvas = (props) => {
  const { posts, user } = props
  const images = posts[0].postImage
  const viewer = useRef(null)
  const [texts, setTexts] = useState({
    brokerName: `${user.firstname} ${user.lastname}`,
    brokerPhone: user.phone,
    brokerEmail: user.email
  })
  const [boundingBox, setBoundingBox] = useState(true)

  const handleTexts = (e) => {
    setTexts({ ...texts, [e.target.name]: e.target.value })
  }

  const handleBoundingBox = (e) => {
    setBoundingBox(!boundingBox)
  }

  return (
    <>
      {images.map((item) => (
        <div
          key={item.id}
          className={style.canvas}
          ref={viewer}
          style={{ backgroundImage: `url(${item.formats.large.url})` }}
        >
          <Draggable
            axis="both"
            bounds="parent"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[4, 4]}
            scale={1}
          >
            <div className={`${style.handle} handle`}>
              <div className={`${style.dragglableInfo}`} style={{ border: boundingBox ? '1px dashed #000' : 'none' }}>
                <input
                  name="brokerName"
                  type="text"
                  value={texts.brokerName}
                  onChange={(e) => handleTexts(e)}
                  style={{ width: `${(texts.brokerName.length + 1) * 15}px` }}
                />
              </div>
            </div>
          </Draggable>
          <Draggable
            axis="both"
            bounds="parent"
            handle=".handle"
            defaultPosition={{ x: 0, y: 60 }}
            position={null}
            grid={[4, 4]}
            scale={1}
          >
            <div className={`${style.handle} handle`}>
              <div className={`${style.dragglableInfo}`} style={{ border: boundingBox ? '1px dashed #000' : 'none' }}>
                <input
                  name="brokerPhone"
                  type="text"
                  value={texts.brokerPhone}
                  onChange={(e) => handleTexts(e)}
                  style={{ width: `${(texts.brokerPhone.length + 1) * 15}px` }}
                />
              </div>
            </div>
          </Draggable>
          <Draggable
            axis="both"
            bounds="parent"
            handle=".handle"
            defaultPosition={{ x: 0, y: 110 }}
            position={null}
            grid={[4, 4]}
            scale={1}
          >
            <div className={`${style.handle} handle`}>
              <div className={`${style.dragglableInfo}`} style={{ border: boundingBox ? '1px dashed #000' : 'none' }}>
                <input
                  name="brokerEmail"
                  type="text"
                  value={texts.brokerEmail}
                  onChange={(e) => handleTexts(e)}
                  style={{ width: `${(texts.brokerEmail.length + 1) * 15}px` }}
                />
              </div>
            </div>
          </Draggable>
        </div>
      ))}
      <div className={style.actions}>
        <div className={style.boundingBox}>
          <input name="boundingBox" type="checkbox" checked={boundingBox} onChange={(e) => handleBoundingBox(e)} />
          <label htmlFor="boundingBox">Show bounding boxes on texts?</label>
        </div>
      </div>
    </>
  )
}

export default Canvas
