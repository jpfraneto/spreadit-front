import React, { useState } from 'react';
import { connectToDatabase } from '../../lib/mongodb';
import { getSession, useSession } from 'next-auth/react';
import NewSpreadAlert from '../../components/Alerts/NewSpreadAlert';
import SavedAlert from '../../components/Alerts/SavedAlert';
import styles from '../../styles/Alerts.module.css';

export async function getServerSideProps(context) {
  let { db } = await connectToDatabase();
  let userAlerts = [];
  const session = await getSession(context);
  if (!session) return { props: {} };
  const user = await db
    .collection('users')
    .findOne({ username: session.user.username });
  if (user) userAlerts = user.alerts || [];
  return {
    props: { userAlerts },
  };
}

const Alerts = ({ userAlerts }) => {
  const { data: session } = useSession();
  const [activeAlerts, setActiveAlerts] = useState(userAlerts);
  if (!session) return <p>You need to be logged in to access this page</p>;
  return (
    <div className={styles.mainContainer}>
      {activeAlerts && (
        <>
          <h1 className={styles.title}>Spread Alerts</h1>
          <div className={styles.savedAlertsContainer}>
            {activeAlerts.map((savedAlert, index) => (
              <SavedAlert key={index} savedAlert={savedAlert} />
            ))}
          </div>
        </>
      )}
      <NewSpreadAlert setActiveAlerts={setActiveAlerts} />
    </div>
  );
};

export default Alerts;
