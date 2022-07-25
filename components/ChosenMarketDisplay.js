import React, { useEffect, useState } from 'react';

const ChosenMarketDisplay = ({ chosenMarket }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBudaAPI = async () => {
      console.log('the chosen market is: 0, ', chosenMarket.toLowerCase());
      const response = await fetch(`https://www.buda.com/api/v2/markets`);
      console.log('the response is: ', response);
      setLoading(false);
    };
    fetchBudaAPI();
  }, [chosenMarket]);
  if (loading) return <p>LOading!</p>;
  return <div>Market display {chosenMarket}</div>;
};

export default ChosenMarketDisplay;
