import { saveAs } from 'file-saver'
import * as JSZip from 'jszip'
import * as JSZipUtils from 'jszip-utils'
import style from '../../styles/SocialPosts.module.scss'

const SocialPostsList = (props) => {
  const { posts } = props
  const images = posts[0].postImage

  const zipAndDownload = () => {
    const zip = new JSZip()
    let count = 0
    const zipFilename = 'social-media-posts.zip'

    const urls = images.map((item) => item)

    urls.forEach((url) => {
      const filename = `${url.name}${url.ext}`
      const urlPath = url.formats.large.url
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(urlPath, (err, data) => {
        if (err) {
          throw err // or handle the error
        }
        zip.file(filename, data, { binary: true })
        count++
        if (count === urls.length) {
          zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, zipFilename)
          })
        }
      })
    })
  }

  return (
    <>
      <ul className={style.imageList}>
        {images.map((item) => (
          <li key={item.id} className={style.imageItem}>
            <img src={item.formats.large.url} alt={item.title} />
          </li>
        ))}
      </ul>
      <button className={style.btnDownload} type="button" onClick={zipAndDownload}>
        Download
      </button>
    </>
  )
}

export default SocialPostsList
