
import React, { useState, useEffect } from 'react';
import TransactionTable from './components/transactionTable';
import TransactionForm from './components/transactionForm';
import SearchBar from './components/searchBar';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8001/transactions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (newTransaction) => {
    // Optimistically update UI
    setTransactions((prev) => [...prev, newTransaction]);

    try {
      const response = await fetch('http://localhost:8001/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      const data = await response.json();
     
    } catch (error) {
      setError(error.message);
      // Revert UI update if there's an error
      setTransactions((prev) => prev.filter(txn => txn !== newTransaction));
    }
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
