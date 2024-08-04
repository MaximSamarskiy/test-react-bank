import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../component/back_button/back_button';


const TransactionPage = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`http://localhost:5000/transaction/${transactionId}`);
        const data = await response.json();
        if (response.ok) {
          setTransaction(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Помилка отримання деталей трансакції');
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="header-content">
          <BackButton />
          <h1 className="page_title">Transaction</h1>
        </div>
      </header>
      <div className="transaction-details">
        <div className={`transaction-amount ${transaction.type === 'receive' ? 'positive' : 'negative'}`}>
          {transaction.type === 'receive' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </div>
        <div className="transaction-info">
          <div className="transaction-row">
            <span>Date</span>
            <span>{new Date(transaction.date).toLocaleString()}</span>
          </div>
          <div className="transaction-row">
            <span>Address</span>
            <span>{transaction.email}</span>
          </div>
          <div className="transaction-row">
            <span>Type</span>
            <span>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
