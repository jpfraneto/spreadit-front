import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Fetcher from '../components/fetcher';
import MarketCard from '../components/MarketCard';
import ChosenMarketDisplay from '../components/ChosenMarketDisplay';
import { useSession } from 'next-auth/react';
import MarketsLandingInformation from '../components/MarketsLandingInformation';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Spreadit</title>
        <meta
          name='description'
          content='Spreadit is the place on which you realize how liquid the world of bitcoin is becoming by understanding the evolution of the spread of its buy and sell prizes'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <MarketsLandingInformation />
        {/* 
        {chosenMarket && <ChosenMarketDisplay chosenMarket={chosenMarket} />} */}
      </main>
    </div>
  );
}
