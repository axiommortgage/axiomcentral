import styles from '../styles/Avatar.module.scss';

const Avatar = props => {
  return (
    <div className={styles.ax_avatar} style={{ backgroundImage: `url(${props.photoUrl})`, width: `${props.size ? props.size + 'px' : '60px'}`, height: `${props.size ? props.size + 'px' : '60px'}` }}>
    </div>
  )
}

export default Avatar;