import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../component/back_button/back_button';
import { saveSession } from '../../hooks/saveSession';
import { AuthContext } from '../../context/AuthContext';

function RecoveryConfirmPage() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Пароль успішно оновлено:', data.message);

        if (data.token) {
          saveSession({ token: data.token });
          dispatch({ type: 'LOGIN', payload: { email: data.email, token: data.token } });
          navigate('/balance');
        } else {
          console.error('Токен не було надано у відповіді');
          setError('Помилка автентифікації');
        }
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
    <div className="page page--recovery-confirm">
      <header className="header">
        <BackButton />
      </header>

      <form className="page_section" onSubmit={handleSubmit}>
        <h1 className="page_title">Recover password</h1>
        <h3 className="page_description">Write the code you received</h3>

        <div className="form">
          <div className="form_item">
            <label htmlFor="code">Code</label>
            <input
              className='field_input'
              type="text"
              id="code"
              placeholder="Enter recovery code"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              required
            />
          </div>

          <div className="form_item">
            <label htmlFor="newPassword">New Password</label>
            <input
              className='field_input'
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </div>

          <button
            type="submit"
            className={`button ${isLoading ? 'button--disabled' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Update Password'}
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

export default RecoveryConfirmPage;
