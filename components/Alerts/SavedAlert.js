import React from 'react';
import styles from './SavedAlert.module.css';

const SavedAlert = ({ savedAlert }) => {
  return (
    <div className={styles.savedAlertCard}>
      <h2>{savedAlert.market}</h2>
      <h4>{savedAlert.price_comparer}</h4>
      <h4>{savedAlert.alert_price}</h4>
      <h4>Triggering: {savedAlert.triggering}</h4>
      <button onClick={() => alert('see alert history!')}>See History</button>
    </div>
  );
};

export default SavedAlert;
