import Router from 'next/router'
import NProgress from 'nprogress';
import styles from '../styles/Topbar.module.scss';

export const customLoader = () => {
  return (
    `
      <div class="${styles.ax_loading_bar} bar" role="bar">
        <div class="${styles.ax_loading_peg} peg">
        </div>
      </div>
      <div class="${styles.ax_loading_spinner} spinner" role="spinner">
        <div class="${styles.ax_loading_spinner_icon} spinner-icon">
        </div>
      </div>
   `
  )
}

NProgress.configure({
  template: customLoader()
});

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
})
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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