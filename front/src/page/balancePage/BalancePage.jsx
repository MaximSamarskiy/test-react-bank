import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function BalancePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="page page--balance">
      <header className="header">
        <Link to="/" className="arrow--back">
          Back to Home
        </Link>
      </header>

      <div className="page_section">
        <h1 className="page_title">Balance</h1>
        <div className="balance_info">
          <p>Welcome, {currentUser.email}!</p>
          <p>Your balance: $100</p>
        </div>
      </div>
    </div>
  );
}

export default BalancePage;
