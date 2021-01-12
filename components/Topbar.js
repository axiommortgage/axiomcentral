import styles from '../styles/Topbar.module.scss';

const Topbar = props => {
  return (
    <header className={styles.ax_topbar}>
      <div className={styles.ax_logo}>
        <img src="./images/logo.svg" alt="axiom central logo" />
      </div>
    </header>
  )
}

export default Topbar;