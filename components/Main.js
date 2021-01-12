import styles from '../styles/Main.module.scss';

const Main = props => {
  return (
    <main className={styles.ax_main}>
      {props.children}
    </main>
  )
}

export default Main;