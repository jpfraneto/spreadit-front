import React from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const apiResponse = await fetch(
    `${process.env.API_URL}/api/spreads/${context.query.marketid}/history`
  );
  const responseData = await apiResponse.json();
  console.log('the response data is: ', responseData);
  return {
    props: { aloja: 'we124' }, // will be passed to the page component as props
  };
}

const SpreadByMarketId = ({ aloja }) => {
  console.log('IN HERE, al', aloja);
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', width: '666px', margin: '0 auto' }}>
      <h1>{router.query.marketid}</h1>
      <p>
        This is the page for a particular market. The missions for this place
        are:
      </p>
      <p>
        To display the history of the spreads: For this I need to be able to
        store them in the database and fetch that information in a way that is
        conducent to being able to display it. How to do this? I don't really
        know. This has a lot to do with dealing with databases, and how to store
        information in them. I have never done that properly, so there is not an
        understanding in me on how to do it.
      </p>
      <p>To set up an alarm for this particular market</p>
      <button onClick={() => alert('alarm for this market!')}>Alarm</button>
    </div>
  );
};

export default SpreadByMarketId;
