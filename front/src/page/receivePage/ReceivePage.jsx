import React, { useState } from 'react';
import './index.scss';
import BackButton from '../../component/back_button/back_button';
import Frame1 from '../../image/Frame 539.png';
import Frame2 from '../../image/Frame 537.png';

const ReceivePage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.accessToken);
        return data.accessToken;
      } else {
        setError('Не вдалося оновити token');
      }
    } catch (error) {
      setError('Не вдалося оновити token');
    }
    return null;
  };

  const handleReceive = async (selectedPaymentMethod) => {
    let token = localStorage.getItem('token');
  
    if (!token) {
      setError('Token не знайдено, увійдіть');
      return;
    }
  
    try {
      let response = await fetch('http://localhost:5000/auth/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, paymentMethod: selectedPaymentMethod }),
      });
  
      if (response.status === 401) {
        token = await refreshToken();
        if (!token) return;
  
        response = await fetch('http://localhost:5000/auth/receive', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount, paymentMethod: selectedPaymentMethod }),
        });
      }
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess('Трансакцію створено успішно');
        setAmount('');
        setPaymentMethod('');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Помилка обробки транзакції');
    }
  };
  
  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    handleReceive(method);
  };

  return (
    <div className="page receive-page">
      <header className="header">
        <button className="back-button"><BackButton /></button>
        <h1>Receive</h1>
      </header>
      <div className="form-group">
        <label htmlFor="amount">Receive amount</label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="$0.00"
        />
      </div>
      <div className="form-group">
        <label>Payment system</label>
        <div className="payment-options">
          <div className={`payment-option ${paymentMethod === 'Stripe' ? 'selected' : ''}`} onClick={() => handlePaymentMethodSelect('Stripe')}>
            <span className="payment-option-logo">S</span> Stripe
            <div className="img_logo">
              <img className="img" src={Frame1} alt="" />
            </div>
          </div>
          <div className={`payment-option ${paymentMethod === 'Coinbase' ? 'selected' : ''}`} onClick={() => handlePaymentMethodSelect('Coinbase')}>
            <span className="payment-option-logo">C</span> Coinbase
            <img className="img" src={Frame2} alt="" />
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default ReceivePage;
