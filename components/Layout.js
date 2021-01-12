import Topbar from './Topbar.js';
import Menu from './Menu.js';
import Main from './Main.js';
import styles from '../styles/Layout.module.scss';

const Layout = props => {
  return (
    <section className={styles.ax_layout}>
      <Topbar className={styles.ax_topbar} />
      <Menu className={styles.ax_menu} />
      <Main className={styles.ax_main}>
        {props.children}
      </Main>
    </section>
  )
}

export default Layout;