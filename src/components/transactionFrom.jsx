import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addTransaction = (newTransaction) => {
    // Optimistically update UI
    setTransactions([...transactions, newTransaction]);

    // Send POST request to update the backend
    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      return response.json();
    }).catch(error => {
      setError(error.message);
      // Revert UI update if there's an error
      setTransactions(transactions.filter(txn => txn !== newTransaction));
    });
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
};

export default App;
y