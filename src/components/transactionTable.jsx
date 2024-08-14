import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          <th scope="col" style={{ textAlign: 'right' }}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td style={{ color: transaction.amount < 0 ? 'red' : 'black', textAlign: 'right' }}>
                {transaction.amount.toFixed(2)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center' }}>No transactions available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;

