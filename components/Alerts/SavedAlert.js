import React from 'react';
import styles from './SavedAlert.module.css';

const SavedAlert = ({ savedAlert }) => {
  return (
    <div className={styles.savedAlertCard}>
      <h2>{savedAlert.marketForAlerting}</h2>
      <h4>{savedAlert.prizeComparer}</h4>
      <h4>{savedAlert.baseSpreadReferenceValue}</h4>
      <button onClick={() => alert('see alert history!')}>See History</button>
    </div>
  );
};

export default SavedAlert;
