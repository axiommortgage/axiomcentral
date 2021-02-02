import styles from '../styles/Menu.module.scss';
import Link from 'next/link';
import { UilApps, UilUser, UilUserPlus } from '@iconscout/react-unicons';


const Menu = props => {
  return (
    <aside className={styles.ax_menu}>
      <nav>
        <div className={styles.ax_menu_item}>
          <UilApps size={20} />
          <Link href="/dashboard"> Dashboard</Link>
        </div>

        <div className={styles.ax_menu_item}>
          <UilUserPlus size={20} />
          <Link href="/add-broker"> Add Broker</Link>
        </div>

        <div className={styles.ax_menu_item}>
          <UilUser size={20} />
          <Link href="/all-brokers"> All Brokers</Link>
        </div>
      </nav>
    </aside>
  )
}

export default Menu;