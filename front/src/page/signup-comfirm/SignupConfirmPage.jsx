import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import BackButton from '../../component/back_button/back_button';
import Field from '../../component/field/Field';



const SignupConfirmPage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleConfirmation = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/confirm-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({ confirmationCode })
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'LOGIN', payload: { user: data.user, token: state.token } });
        navigate('/balance');
      } else {
        setError('Невірний код підтвердження');
      }
    } catch (error) {
      console.error('Помилка підтвердження облікового запису:', error);
      setError('Щось пішло не так. Будь ласка, спробуйте ще раз.');
    }
  };

  if (state.user && state.user.confirmed) {
    return <Navigate to="/balance" />;
  }

  return (
    <div className='page'>
      <header className="header">
        <BackButton />
      </header>
      <h2 className='page_title'>Confirm account</h2>
      <h3 className="page_description">Write the code you received</h3>
      <Field
        label="Code"
        type="text"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
        placeholder="Введіть код підтвердження"
      />
      <button className='button' onClick={handleConfirmation}>Confirm</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignupConfirmPage;
