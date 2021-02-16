import styles from '../styles/Loaders.module.scss';

const Processing = props => {
  if (props.processing === true) {
    return (
      <div className={styles.ax_processing}>
        <span></span>
        <p>{props.message}</p>
      </div>
    )
  } else {
    return <div className={styles.ax_processing_hidden}></div>
  }
}

export default Processing;