import Link from 'next/link';
import React from 'react';
import styles from './AlertCard.module.css';

const AlertCard = ({ alert }) => {
  return (
    <Link href={`/alerts/${alert._id}`}>
      <div
        className={`${styles.alertCardContainer} ${
          alert.triggering && styles.triggering
        }`}
      >
        <h4>@{alert.username}</h4>
        <h5>{alert.market}</h5>
        <h5>
          {alert.price_comparer} {alert.alert_price}
        </h5>
        {alert.triggered && alert.triggered.length > 0 ? (
          <div>
            <p>Triggered {alert.triggered.length} times!</p>
            <p>
              <strong>
                {' '}
                Last one:{' '}
                {alert.triggered[alert.triggered.length - 1].timestamp} /{' '}
                {alert.triggered[alert.triggered.length - 1].spread}
              </strong>
            </p>
          </div>
        ) : (
          <p>This one hasnt been triggered</p>
        )}
      </div>
    </Link>
  );
};

export default AlertCard;
