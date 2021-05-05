import Link from 'next/link'
import styles from '../styles/Avatar.module.scss'

const Avatar = (props) => {
  const { photoUrl, size } = props
  return (
    <Link href="/profile" passHref>
      <a
        href="/profile"
        className={styles.ax_avatar}
        style={{
          backgroundImage: `url(${photoUrl})`,
          width: `${size ? `${size}px` : '60px'}`,
          height: `${size ? `${size}px` : '60px'}`
        }}
      >
        .
      </a>
    </Link>
  )
}

export default Avatar
