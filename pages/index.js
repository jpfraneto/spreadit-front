import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Fetcher from '../components/fetcher';
import MarketCard from '../components/MarketCard';
import ChosenMarketDisplay from '../components/ChosenMarketDisplay';
import data from '../data/markets';
import { useSession } from 'next-auth/react';
import MarketsLandingInformation from '../components/MarketsLandingInformation';

export default function Home() {
  const { data: session } = useSession();
  const [chosenMarkets, setChosenMarkets] = useState([]);
  const [chosenSpreadsValues, setChosenSpreadsValues] = useState([]);
  const [buttonText, setButtonText] = useState('Fetch chosen spreads');
  const [loading, setLoading] = useState(false);
  const getParticularSpreads = async () => {
    if (chosenMarkets.length === 0)
      return alert('Please choose a market to fetch!');
    setLoading(true);
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        markets: chosenMarkets,
      }),
    };
    // const response = await fetch(
    //   `http://localhost:3001/api/spreads`,
    //   reqParams
    // );
    const response = await fetch(
      `https://api.spreadit.pro/api/spreads`,
      reqParams
    );
    const data = await response.json();
    setChosenSpreadsValues(data.spreads);
    setLoading(false);
    setButtonText('Update spread values');
  };
  const handleAddMarket = market => {
    setChosenMarkets(prev => {
      const marketIndex = prev.indexOf(market);
      if (marketIndex === -1) return [...prev, market];
      return prev.filter(x => x !== market);
    });
  };
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

      <main className={styles.mainContainer}>
        <h2>Choose some markets to get their spreads:</h2>
        {data && (
          <div className={styles.marketIdsContainer}>
            {data.marketIds.map((market, id) => (
              <span
                className={`${styles.marketIds} ${
                  chosenMarkets.includes(market.toLowerCase())
                    ? styles.chosenMarketId
                    : ''
                }`}
                onClick={() => handleAddMarket(market.toLowerCase())}
                key={id}
              >
                {market}
              </span>
            ))}
          </div>
        )}
        <button className={styles.fetchBtn} onClick={getParticularSpreads}>
          {loading ? 'Loading...' : buttonText}
        </button>
        {chosenSpreadsValues && (
          <div>
            <div className={styles.spreadsValuesContainer}>
              {chosenSpreadsValues.map((x, index) => {
                return (
                  <div key={index} className={styles.spreadsValues}>
                    <p>{x.id}</p>
                    <p>
                      Spread Value: {x.spread[0]} {x.spread[1]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
