import { logout } from '../auth/auth';
import styles from '../styles/Menu.module.scss';
import Link from 'next/link';
import { UilSignOutAlt, UilBooks, UilEnvelopeAlt, UilEditAlt, UilFolder, UilFidgetSpinner, UilSchedule, UilAward, UilStar, UilHeart, UilShieldCheck, UilMoneyWithdraw, UilGlobe, UilUniversity, UilMegaphone, UilCalender, UilApps, UilUser, UilUserPlus, UilBullseye, UilServerNetworkAlt, UilClinicMedical, UilUsdCircle } from '@iconscout/react-unicons';


const Menu = props => {
  return (
    <aside className={styles.ax_menu}>
      <nav>
        <div className={styles.ax_menu_item}>
          <UilApps size={20} />
          <Link href="/dashboard"> Dashboard</Link>
        </div>

        {/* <div className={styles.ax_menu_item}>
          <UilBullseye size={20} />
          <Link href="/branding"> Branding</Link>
        </div> */}

        <div className={styles.ax_menu_item}>
          <UilServerNetworkAlt size={20} />
          <Link href="/technology"> Technology</Link>
        </div>

        {/* <div className={styles.ax_menu_item}>
          <UilMegaphone size={20} />
          <Link href="/marketing"> Marketing</Link>
        </div> */}

        <div className={styles.ax_menu_item}>
          <UilUniversity size={20} />
          <Link href="/lender-lounge"> Lender Lounge</Link>
        </div>

        {/* <div className={styles.ax_menu_item}>
          <UilGlobe size={20} />
          <Link href="/axiom-sites"> Axiom Sites</Link>
        </div> */}

        <div className={styles.ax_menu_item}>
          <UilEditAlt size={20} />
          <Link href="/email-signature"> Email Signature</Link>
        </div>

        {/* <div className={styles.ax_menu_item}>
          <UilMoneyWithdraw size={20} />
          <Link href="/payroll-compliance"> Payroll Compliance</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilCalender size={20} />
          <Link href="/events"> Events</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilShieldCheck size={20} />
          <Link href="/mpp"> MPP</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilClinicMedical size={20} />
          <Link href="/insurers"> Insurers</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilUsdCircle size={20} />
          <Link href="/appraisers"> Appraisers</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilHeart size={20} />
          <Link href="/axiom-cares"> Axiom Cares</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilStar size={20} />
          <Link href="/group-benefits"> Group Benefits</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilAward size={20} />
          <Link href="/awards"> Axiom Awards</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilSchedule size={20} />
          <Link href="/company-calendar"> Company Calendar</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilFolder size={20} />
          <Link href="/company-directory"> Company Directory</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilFidgetSpinner size={20} />
          <Link href="/fit-club"> Axiom Fit Club</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilBooks size={20} />
          <Link href="/book-club"> Axiom Book Club</Link>
        </div> */}


        {/* <div className={styles.ax_menu_item}>
          <UilEnvelopeAlt size={20} />
          <Link href="/newsletter"> Newsletter</Link>
        </div> */}

        {/* <div className={styles.ax_menu_item}>
          <UilUserPlus size={20} />
          <Link href="/add-broker"> Add Broker</Link>
        </div> */}

        <div className={styles.ax_menu_item}>
          <UilUser size={20} />
          <Link href="/profile"> Profile</Link>
        </div>

        <div className={styles.ax_menu_item}>
          <UilUser size={20} />
          <Link href="/all-brokers"> All Brokers</Link>
        </div>

        <div className={styles.ax_menu_item}>
          <UilSignOutAlt size={20} />
          <a onClick={logout}> Logout</a>
        </div>
      </nav>
    </aside>
  )
}

export default Menu;