import React, { useState, useEffect } from 'react';
import styles from './MarketsLandingInformation.module.css';
import MarketCard from './MarketCard';

const MarketsLandingInformation = () => {
  const [markets, setMarkets] = useState([]);
  const [chosenMarket, setChosenMarket] = useState(null);
  useEffect(() => {
    const getSpreadsInfo = async () => {
      const response = await fetch('http://api.spreadit.pro/api/spreads');
      const data = await response.json();
      setMarkets(data.marketsSpreads);
    };
    getSpreadsInfo();
  }, []);
  return (
    <div>
      <div className={styles.marketsContainer}>
        {markets &&
          markets.map((market, index) => {
            return (
              <MarketCard
                key={index}
                setChosenMarket={setChosenMarket}
                market={market}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MarketsLandingInformation;
