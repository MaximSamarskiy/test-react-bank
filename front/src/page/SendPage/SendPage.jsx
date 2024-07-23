import React, { useState, useContext } from 'react';
import BackButton from '../../component/back_button/back_button';
import Field from '../../component/field/Field';
import { AuthContext } from '../../context/AuthContext';

const SendPage = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setEmail('');
        setAmount('');
        setError(null);
        dispatch({ type: 'ADD_NOTIFICATION', payload: { message: data.message, type: 'Transaction' } });
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Під час надсилання грошей сталася помилка.');
    }
  };

  return (
    <div className='page'>
      <div className='header'>
        <BackButton />
        <h2>Send</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email of Recipient:</label>
          <Field
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <Field
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button className='button' type="submit">Send Money</button>
      </form>
    </div>
  );
};

export default SendPage;
