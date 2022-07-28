import React from 'react';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const apiResponse = await fetch(
    `http://localhost:3001/api/spreads/alert/${context.query.alert_id}`
  );
  const responseData = await apiResponse.json();
  return {
    props: { alert: JSON.parse(JSON.stringify(responseData.alert)) },
  };
}

const AlertById = ({ alert }) => {
  return (
    <div>
      <h1>{alert.username}</h1>
      <h2>{alert.market}</h2>
      <p>Triggering: {alert.triggering.toString()}</p>
      <p>
        {alert.price_comparer} {alert.alert_price}
      </p>
      <div>
        {alert.triggered ? (
          <div>
            Triggered {alert.triggered.length} times
            <div style={{ height: '33vh', overflowY: 'scroll' }}>
              {alert.triggered.map(x => (
                <p style={{ margin: '0' }}>
                  {x.timestamp} : {x.spread}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p>This alert has not been triggered</p>
        )}
      </div>
      <Link href='/alerts'>
        <a>Go back</a>
      </Link>
    </div>
  );
};

export default AlertById;
