import styles from '../styles/Avatar.module.scss';
import Link from 'next/link';

const Avatar = props => {
  return (
    <Link href="/profile">
      <a className={styles.ax_avatar} style={{ backgroundImage: `url(${props.photoUrl})`, width: `${props.size ? props.size + 'px' : '60px'}`, height: `${props.size ? props.size + 'px' : '60px'}` }}>
      </a>
    </Link>
  )
}

export default Avatar;