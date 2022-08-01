import React from 'react';
import styles from './LeftNavbar.module.css';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const LeftNavbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogout = () => {
    signOut({
      callbackUrl: `/`,
    });
    router.push('/');
  };
  if (!session) return <div className={styles.leftNav}>Loading...</div>;
  return (
    <div className={styles.leftNav}>
      <h1>@{session.user.username}</h1>
      <div className={styles.btnsContainer}>
        <Link href='/u/dashboard'>
          <button
            className={`${styles.menuBtn} ${
              router.pathname == '/u/dashboard' && styles.isActiveRoute
            }`}
          >
            Home
          </button>
        </Link>
        {/* <Link href='/u/assets'>
          <button
            className={`${styles.menuBtn} ${
              router.pathname == '/u/assets' && styles.isActiveRoute
            }`}
          >
            Assets
          </button>
        </Link>
        <Link href='/u/trade'>
          <button
            className={`${styles.menuBtn} ${
              router.pathname == '/u/trade' && styles.isActiveRoute
            }`}
          >
            Trade
          </button>
        </Link> */}
        <Link href='/u/alerts'>
          <button
            className={`${styles.menuBtn} ${
              router.pathname == '/u/alerts' && styles.isActiveRoute
            }`}
          >
            Alerts
          </button>
        </Link>
      </div>
      <div className={styles.footerBtns}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LeftNavbar;
