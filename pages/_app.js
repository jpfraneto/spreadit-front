import Navbar from '../components/layout/Navbar';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Front | Spreadit</title>
      </Head>{' '}
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
