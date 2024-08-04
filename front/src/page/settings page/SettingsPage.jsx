import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import BackButton from "../../component/back_button/back_button";
import Field from "../../component/field/Field";
import FieldPassword from '../../component/field-password/FieldPassword';
import './index.scss';

const SettingsPage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state || {};
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (Object.values(fieldErrors).some(error => error !== '')) {
      setMessage('Виправте помилки перед надсиланням.');
      return;
    }
    setMessage('');
    if (!user || !user.token) {
      setMessage('Користувач не авторизований.');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/setting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ action: 'updatePassword', oldPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Пароль успішно оновлено');
      } else {
        setMessage(data.error || 'Помилка оновлення пароля');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Помилка оновлення пароля');
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    if (Object.values(fieldErrors).some(error => error !== '')) {
      setMessage('Виправте помилки перед надсиланням.');
      return;
    }
    setMessage('');
    if (!user || !user.token) {
      setMessage('Користувач не авторизований.');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/setting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ action: 'updateEmail', email, oldPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: 'UPDATE_EMAIL', payload: email });
        setMessage('Електронну пошту успішно оновлено');
      } else {
        setMessage(data.error || 'Помилка оновлення електронної пошти');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      setMessage('Помилка оновлення електронної пошти');
    }
  };

  const handleLogout = async () => {
    setMessage('');
    if (!user || !user.token) {
      setMessage('Користувач не авторизований.');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/setting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ action: 'logoutUser' }),
      });
      if (res.ok) {
        dispatch({ type: 'LOGOUT' });
        setMessage('Успішно вийшов');
      } else {
        const data = await res.json();
        setMessage(data.error || 'Помилка виходу');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setMessage('Помилка виходу');
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header-content">
          <BackButton />
          <h1 className="page_title">Settings</h1>
        </div>
      </header>

      <div className="page_section">
        <div className="form">
          <form onSubmit={handleEmailChange} className="form_item">
            <Field
              label="Email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              setFieldErrors={setFieldErrors}
              required
            />
            <FieldPassword
              label="Old Password"
              name="oldPassword"
              value={oldPassword}
              onChange={setOldPassword}
              setFieldErrors={setFieldErrors}
              required
            />
            <button className="button button_save" type="submit">Save Email</button>
          </form>

          <form onSubmit={handlePasswordChange} className="form_item">
            <FieldPassword
              label="Old Password"
              name="oldPassword"
              value={oldPassword}
              onChange={setOldPassword}
              setFieldErrors={setFieldErrors}
              required
            />
            <FieldPassword
              label="New Password"
              name="newPassword"
              value={newPassword}
              onChange={setNewPassword}
              setFieldErrors={setFieldErrors}
              required
            />
            <button className="button button_save" type="submit">Save Password</button>
          </form>
        </div>
        <button className="button logout-button" onClick={handleLogout}>
          Log Out
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SettingsPage;
