import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import data from '../../data/markets';
import styles from '../../styles/Dashboard.module.css';

const Dashboard = () => {
  const { data: session } = useSession();
  const [chosenMarkets, setChosenMarkets] = useState([]);
  const [chosenSpreadsValues, setChosenSpreadsValues] = useState([]);
  const handleCreateAlert = async () => {
    console.log('IN HERE!');
    const response = await fetch('http://localhost:3001/api/spreads');
    console.log('the response is: ', response);
    const jsoned = await response.json();
    console.log('the jsoned is:', jsoned);
  };
  const getParticularSpreads = async () => {
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        markets: chosenMarkets,
      }),
    };
    const response = await fetch(
      'http://localhost:3001/api/spreads',
      reqParams
    );
    const data = await response.json();
    setChosenSpreadsValues(data.spreads);
  };
  const handleAddMarket = market => {
    setChosenMarkets(prev => {
      const marketIndex = prev.indexOf(market);
      if (marketIndex === -1) return [...prev, market];
      return prev.filter(x => x !== market);
    });
  };
  if (!session)
    return (
      <div>
        How could you access a dashboard if you are not logged in as a user?
      </div>
    );
  return (
    <div className={styles.mainContainer}>
      <h1>{session.user.username}'s dashboard</h1>
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
      <button onClick={getParticularSpreads}>Fetch chosen spreads</button>
      {chosenSpreadsValues && (
        <div>
          <div className={styles.spreadsValuesContainer}>
            {chosenSpreadsValues.map((x, index) => {
              return (
                <div className={styles.spreadsValues}>
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
    </div>
  );
};

export default Dashboard;
