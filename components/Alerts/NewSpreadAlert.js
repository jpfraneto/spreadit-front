import { useSession } from 'next-auth/react';
import React, { useState, useRef } from 'react';
import data from '../../data/markets';
import styles from './NewAlert.module.css';

const NewSpreadAlert = ({ setActiveAlerts }) => {
  const { data: session } = useSession();
  const [newAlert, setNewAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [marketSpreadValue, setMarketSpreadValue] = useState(null);

  const marketRef = useRef();
  const alertTypeRef = useRef();
  const prizeRef = useRef();

  const handleChange = e => {
    setNewAlert(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleMarketChange = async market => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/spreads/${market.toLowerCase()}`
      );
      const data = await response.json();

      if (data.spread) {
        setMarketSpreadValue(data.spread);
        setNewAlert(prev => {
          return { ...prev, alert_price: data.spread[0] };
        });
      }
    } catch (error) {
      console.log('There was an error');
    }
  };
  const handleSubmitAlert = async () => {
    setAlertMessage('Your alert is being added...');
    if (!newAlert.market)
      return alert('Please choose a market for alerting about it.');
    if (!newAlert.price_comparer) return alert('Please choose a comparer type');
    if (!newAlert.alert_price)
      return alert('Please add a reference value for the alert');
    if (!newAlert.triggering) return alert('Please select a triggering option');
    newAlert.dateAdded = new Date().getTime();
    if (session.user?.username) newAlert.username = session.user.username;
    try {
      setLoading(true);
      const reqParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAlert,
        }),
      };
      const response = await fetch(
        `http://localhost:3001/api/spreads/alert`,
        reqParams
      );
      const data = await response.json();
      console.log('the data that I got back from the server is: ', data);
      setLoading(false);
      setMarketSpreadValue(null);
      setActiveAlerts(prev => {
        return [...prev, newAlert];
      });
      setNewAlert({});
    } catch (error) {
      setAlertMessage('The server is not available, please try again later.');
    }
  };
  return (
    <div className={styles.newAlertContainer}>
      {loading ? (
        <p>{alertMessage}</p>
      ) : (
        <div>
          <h2>New Spread Alert:</h2>
          <div>
            <label htmlFor='market-selection'> Choose Market: </label>
            <select
              ref={marketRef}
              id='market-selection'
              name='market'
              onChange={e => {
                handleChange(e);
                handleMarketChange(e.target.value);
              }}
            >
              <option>...</option>
              {data.marketIds.map((x, index) => (
                <option key={index} value={x.toLowerCase()}>
                  {x.toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <div>
            {' '}
            <label htmlFor='market-selection'>Type of Alert: </label>
            <select
              ref={alertTypeRef}
              name='price_comparer'
              id='priceComparer'
              onChange={handleChange}
            >
              <option>...</option>
              <option value='lowerThan'>Lower Than...</option>
              <option value='biggerThan'>Higher Than...</option>
            </select>
          </div>

          <div>
            <label>Base Spread Prize: </label>
            <input
              ref={prizeRef}
              type='number'
              name='alert_price'
              onChange={handleChange}
              value={newAlert.alert_price}
            />
          </div>
          <div>
            {' '}
            <label htmlFor='triggering'>Triggering: </label>
            <select
              ref={alertTypeRef}
              name='triggering'
              id='triggering'
              onChange={handleChange}
            >
              <option>...</option>
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          </div>
          {marketSpreadValue && (
            <span className={styles.spreadValueMessage}>
              The spread value of {newAlert.market} is now:{' '}
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

export default NewSpreadAlert;
