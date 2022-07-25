import React, { useState, useEffect } from 'react';

const Fetcher = () => {
  const [url, setUrl] = useState(
    'https://spreaditjpfs.herokuapp.com/api/markets'
  );

  const fetchTheRoute = async () => {
    const response = await fetch(url);
    console.log('the response is: ', response);
    const data = await response.json();
    console.log('the fetched data is: ', data);
  };
  return (
    <div>
      Fetcher
      <br />
      <input
        onChange={e => setUrl(e.target.value)}
        value={url}
        type='text'
        style={{ width: '500px' }}
      />
      <br />
      <button onClick={fetchTheRoute}>Fetch!</button>
    </div>
  );
};

export default Fetcher;
