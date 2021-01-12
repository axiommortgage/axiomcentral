import styles from '../styles/Menu.module.scss';
import Link from 'next/link';
import { UilApps } from '@iconscout/react-unicons';


const Menu = props => {
  return (
    <aside className={styles.ax_menu}>
      <nav>
        <div className={styles.ax_menu_item}>
          <UilApps size={20} />
          <Link href="/"> Dashboard</Link>
        </div>
      </nav>
    </aside>
  )
}

export default Menu;