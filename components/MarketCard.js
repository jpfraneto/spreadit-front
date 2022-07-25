import React from 'react';
import styles from './MarketCard.module.css';

const MarketCard = ({ market, setChosenMarket }) => {
  return (
    <div className={styles.marketCard} onClick={() => setChosenMarket(market)}>
      {market}
    </div>
  );
};

export default MarketCard;
