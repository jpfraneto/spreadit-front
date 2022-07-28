import React, { useState } from 'react';
import AlertsDisplay from '../../components/Alerts/AlertsDisplay';
import NewSpreadAlert from '../../components/Alerts/NewSpreadAlert';

export async function getServerSideProps(context) {
  const apiResponse = await fetch(`http://localhost:3001/api/spreads/alerts`);
  const responseData = await apiResponse.json();
  return {
    props: { alerts: responseData.alerts },
  };
}

const Alerts = ({ alerts }) => {
  const [displayNewSpreadAlert, setDisplayNewSpreadAlert] = useState(false);
  const [allSpreadAlerts, setAllSpreadAlerts] = useState(alerts);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Spread Alerts</h1>
      <p>
        <span>Green means that the alert is triggering</span> /{' '}
        <span>White means that the alert is not triggering</span>
      </p>

      <AlertsDisplay alerts={allSpreadAlerts} />
      <button onClick={() => setDisplayNewSpreadAlert(prev => !prev)}>
        {!displayNewSpreadAlert ? 'Show' : 'Hide'}
      </button>
      {displayNewSpreadAlert && (
        <NewSpreadAlert setAllSpreadAlerts={setAllSpreadAlerts} />
      )}
    </div>
  );
};

export default Alerts;
