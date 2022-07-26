import React, { useState } from 'react';
import data from '../../data/markets';
import { connectToDatabase } from '../../lib/mongodb';
import { getSession } from 'next-auth/react';
import NewAlert from '../../components/Alerts/NewAlert';
import SavedAlert from '../../components/Alerts/SavedAlert';
import styles from '../../styles/Alerts.module.css';

export async function getServerSideProps(context) {
  let { db } = await connectToDatabase();
  let userAlerts = [];
  const session = await getSession(context);
  const user = await db
    .collection('users')
    .findOne({ username: session.user.username });
  if (user) userAlerts = user.alerts || [];
  return {
    props: { userAlerts },
  };
}

const Alerts = ({ userAlerts }) => {
  const [activeAlerts, setActiveAlerts] = useState(userAlerts);
  return (
    <div className={styles.mainContainer}>
      {activeAlerts && (
        <>
          <h1>Spread Alerts</h1>
          <div className={styles.savedAlertsContainer}>
            {activeAlerts.map((savedAlert, index) => (
              <SavedAlert key={index} savedAlert={savedAlert} />
            ))}
          </div>
        </>
      )}
      <NewAlert setActiveAlerts={setActiveAlerts} />
    </div>
  );
};

export default Alerts;
