import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from "../../component/back_button/back_button";

function RecoveryPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log('Надсилання запиту на відновлення електронної пошти:', email);

    try {
      const res = await fetch('http://localhost:5000/auth/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Код відновлення успішно надіслано:', data.message);
        navigate('/recovery-confirm');
      } else {
        console.error('Помилка у відповіді:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Помилка під час отримання:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page--recovery">
      <header className="header">
        <BackButton />
      </header>

      <form className="page_section" onSubmit={handleSubmit}>
        <h1 className="page_title">Recover password</h1>
        <h3 className="page_description">Choose a recovery method</h3>

        <div className="form">
          <div className="form_item">
            <label htmlFor="email">Email</label>
            <input
              className='field_input'
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <button
            type="submit"
            className={`button ${isLoading ? 'button--disabled' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Send Code'}
          </button>

          {error && (
            <div className="alert alert--error">
              <span className="form_error">{error}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default RecoveryPage;
