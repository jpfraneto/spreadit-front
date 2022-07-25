import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Fetcher from '../components/fetcher';
import MarketCard from '../components/MarketCard';
import ChosenMarketDisplay from '../components/ChosenMarketDisplay';
import data from '../data/markets';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [markets, setMarkets] = useState(data.marketIds);
  const [chosenMarket, setChosenMarket] = useState(null);
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
        <div className={styles.marketsContainer}>
          {' '}
          {markets &&
            markets.map(market => (
              <MarketCard setChosenMarket={setChosenMarket} market={market} />
            ))}
        </div>

        {chosenMarket && <ChosenMarketDisplay chosenMarket={chosenMarket} />}
      </main>
    </div>
  );
}
