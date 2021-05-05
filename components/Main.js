import styles from '../styles/Main.module.scss'

const Main = (props) => {
  const { children } = props
  return <main className={styles.ax_main}>{children}</main>
}

export default Main
