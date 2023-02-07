import React, { useState } from 'react';
import Web3 from 'web3';

const Home = () => {
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [transfers, setTransfers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/getTransfers?startBlock=${startBlock}&endBlock=${endBlock}`);
      headers: {
    'Content-Type': 'application/json',
  },
      console.log(response);
      const data = await response.json();
      setTransfers(data.transfers);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <div style={{ textAlign: 'center' }}>Pudgy Penguins Transfer Checker</div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="text" value={startBlock} onChange={e => setStartBlock(e.target.value)} />
          <input type="text" value={endBlock} onChange={e => setEndBlock(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        {error && <div>Error: {error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          Object.keys(transfers).map(address => (
            <div key={address}>
              Address: {address}
              Number of Transfers: {transfers[address]}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
