import React from 'react';
import styles from './AlertsDisplay.module.css';
import AlertCard from './AlertCard';

const AlertsDisplay = ({ alerts }) => {
  if (!alerts) return <p>Loading!</p>;
  return (
    <div className={styles.alertCardsContainer}>
      {alerts.map(alert => {
        return <AlertCard alert={alert} key={alert._id} />;
      })}
    </div>
  );
};

export default AlertsDisplay;
