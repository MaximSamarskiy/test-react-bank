import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./index.scss";
import Bell from "../../image/svg/bell-ring.png";
import Set from "../../image/svg/bell-ringing.png";
import S from "../../image/svg/Frame 17.png";
import C from "../../image/svg/Frame 19.png";
import People from "../../image/svg/Frame 18.png";

const BalancePage = () => {
  const [balance] = useState(100.20);
  const [transactions] = useState([
    { id: 1, name: 'Stripe', time: '12:25', type: 'Receipt', amount: '+$125.00' },
    { id: 2, name: 'Oleg V.', time: '12:25', type: 'Sending', amount: '-$200.50' },
    { id: 3, name: 'Coinbase', time: '10:20', type: 'Receipt', amount: '+$1,250.00' },
    { id: 4, name: 'Stripe', time: '12:25', type: 'Receipt', amount: '+$125.00' },
    { id: 5, name: 'Diana K.', time: '12:25', type: 'Sending', amount: '-$125.00' },
    { id: 6, name: 'Stripe', time: '12:25', type: 'Receipt', amount: '+$125.00' },
    { id: 7, name: 'Stripe', time: '12:20', type: 'Receipt', amount: '+$15.00' },
  ]);

  const getIcon = (name) => {
    switch (name) {
      case 'Stripe':
        return <img src={S} alt="Stripe" />;
      case 'Coinbase':
        return <img src={C} alt="Coinbase" />;
      case 'Oleg V.':
      case 'Diana K.':
        return <img src={People} alt="Person" />;
      default:
        return null;
    }
  };

  return (
    <div className='page'>
      <div className='header_balance'>
        <div className='head_title'>
          <Link to="/setting">
            <img src={Set} alt="Notification bell ringing" />
          </Link>
          <h1>Main wallet</h1>
          <Link to="/notifications">
            <img src={Bell} alt="Notification bell" />
          </Link>
        </div>
        
        <h2 className="balance-amount">${balance.toFixed(2)}</h2>
        <div className="actions">
        <button ><Link to="/receive">Receive</Link></button>
          <button ><Link to="/send">Send</Link></button>
        </div>
      </div>
      <div className="transaction-list">
        {transactions.map(transaction => (
          <Link to={`/transaction/${transaction.id}`} key={transaction.id}>
            <div className="transaction">
              <div className="transaction-icon">
                {getIcon(transaction.name)}
              </div>
              <div className="transaction-info">
                <span className="transaction-name">{transaction.name}</span>
                <span className="transaction-time">{transaction.time}</span>
                <span className="transaction-type">{transaction.type}</span>
              </div>
              <div className={`transaction-amount ${transaction.amount.startsWith('+') ? 'positive' : 'negative'}`}>
                {transaction.amount}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BalancePage;