import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [displayer, setDisplayer] = useState(true);
  const [updatedUsername, setUpdatedUsername] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) return setDisplayer(false);
  }, [session?.user]);

  const handleUsernameUpdate = async () => {
    if (!username) return alert('Agrega un nombre de usuario!');
    const reqParams = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
      }),
    };
    const response = await fetch('/api/u', reqParams);
    const data = await response.json();
    if (data.available) {
      session.user.username = username;
      setDisplayer(false);
    }
  };

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>Spreadit</a>
          </Link>
        </div>
        <div className={styles.menu}>
          <a href='https://docs.spreadit.pro' target='_blank' rel='noreferrer'>
            API Docs
          </a>
          {session ? (
            <>
              <Link href='/dashboard'>
                <a>
                  {session.user.username
                    ? `${session.user.username}`
                    : `${session.user.email}`}
                </a>
              </Link>
              <a onClick={() => signOut()} className={styles.logoutBtn}>
                Cerrar Sesión
              </a>
            </>
          ) : (
            <a onClick={() => signIn()} className={styles.loginBtn}>
              Iniciar Sesión
            </a>
          )}
        </div>
      </div>
      {displayer && session && !session.user.username && (
        <div className={styles.usernameNav}>
          Get a username!{' '}
          <input
            className={styles.usernameInput}
            type='text'
            onChange={e => setUsername(e.target.value)}
            placeholder='username'
          />
          <button
            className={styles.updateUsernameBtn}
            onClick={handleUsernameUpdate}
          >
            Actualizar
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
