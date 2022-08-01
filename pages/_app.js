import LeftNavbar from '../components/layout/LeftNavbar';
import Navbar from '../components/layout/Navbar';
import RightContainer from '../components/layout/RightContainer';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  if (router.asPath.substring(0, 2) === '/u')
    return (
      <>
        <Head>
          <title>Front | Spreadit</title>
        </Head>{' '}
        <div className='main-container'>
          <SessionProvider session={session}>
            <LeftNavbar />
            <RightContainer>
              <Component {...pageProps} />
            </RightContainer>
          </SessionProvider>
        </div>
      </>
    );
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
