import React from 'react';
import Link from 'next/link';
import styles from './MarketCard.module.css';

const MarketCard = ({ market, setChosenMarket }) => {
  console.log('the market is: ', market);
  return (
    <Link href={`/spreads/${market.id.toLowerCase()}`} passHref>
      <div
        className={styles.marketCard}
        onClick={() => setChosenMarket(market)}
      >
        <h3>{market.id}</h3>
        <p>
          {market.spread[0]} {market.spread[1]}
        </p>
      </div>
    </Link>
  );
};

export default MarketCard;
