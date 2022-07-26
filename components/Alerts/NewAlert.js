import React, { useState, useRef } from 'react';
import data from '../../data/markets';
import styles from './NewAlert.module.css';

const NewAlert = ({ setActiveAlerts }) => {
  const [newAlert, setNewAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [marketSpreadValue, setMarketSpreadValue] = useState(null);

  const marketRef = useRef();
  const alertTypeRef = useRef();
  const prizeRef = useRef();

  const handleChange = e => {
    setNewAlert(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleMarketChange = async market => {
    const response = await fetch(
      `http://localhost:3001/api/spreads/${market.toLowerCase()}`
    );
    const data = await response.json();

    if (data.spread) {
      setMarketSpreadValue(data.spread);
      setNewAlert(prev => {
        return { ...prev, baseSpreadReferenceValue: data.spread[0] };
      });
    }
  };
  const handleSubmitAlert = async () => {
    if (!newAlert.marketForAlerting)
      return alert('Please choose a market for alerting about it.');
    if (!newAlert.prizeComparer) return alert('Please choose a comparer type');
    if (!newAlert.baseSpreadReferenceValue)
      return alert('Please add a reference value for the alert');
    setLoading(true);
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newAlert,
      }),
    };
    const response = await fetch(
      `${process.env.API_URL}/api/u/alerts`,
      reqParams
    );
    const data = await response.json();
    setLoading(false);
    setActiveAlerts(prev => {
      return [...prev, newAlert];
    });
  };
  return (
    <div className={styles.newAlertContainer}>
      {loading ? (
        <p>Your alert is being added...</p>
      ) : (
        <div>
          <h2>New Spread Alert:</h2>
          <div>
            <label htmlFor='market-selection'> Choose Market: </label>
            <select
              ref={marketRef}
              id='market-selection'
              name='marketForAlerting'
              onChange={e => {
                handleChange(e);
                handleMarketChange(e.target.value);
              }}
            >
              <option>...</option>
              {data.marketIds.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div>
            {' '}
            <label htmlFor='market-selection'>Type of Alert: </label>
            <select
              ref={alertTypeRef}
              name='prizeComparer'
              id='prizeComparer'
              onChange={handleChange}
            >
              <option>...</option>
              <option value='lowerThan'>Lower Than...</option>
              <option value='higherThan'>Higher Than...</option>
            </select>
          </div>
          <div>
            <label htmlFor='market-selection'>Base Spread Prize: </label>
            <input
              ref={prizeRef}
              type='number'
              name='baseSpreadReferenceValue'
              onChange={handleChange}
              value={newAlert.baseSpreadReferenceValue}
            />
          </div>
          {marketSpreadValue && (
            <span className={styles.spreadValueMessage}>
              The spread value of {newAlert.marketForAlerting} is now:{' '}
              {marketSpreadValue[0]} {marketSpreadValue[1]}
            </span>
          )}
          <br />
          <button onClick={handleSubmitAlert}>Add Spread Alert</button>
        </div>
      )}
    </div>
  );
};

export default NewAlert;
