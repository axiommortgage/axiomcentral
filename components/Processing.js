import styles from '../styles/Loaders.module.scss'

const Processing = (props) => {
  const { processing } = props

  if (processing === true) {
    return (
      <div className={styles.ax_processing}>
        <span />
        <p>{props.message}</p>
      </div>
    )
  }
  return <div className={styles.ax_processing_hidden} />
}

export default Processing
