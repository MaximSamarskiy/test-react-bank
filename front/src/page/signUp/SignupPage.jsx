import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from "../../component/back_button/back_button";
import Danger from '../../image/svg/danger.svg';
import Field from '../../component/field/Field';
import FieldPassword from "../../component/field-password/FieldPassword";
import { useSignUp } from "../../hooks/useSignUp";
import { AuthContext } from '../../context/AuthContext';
import './index.scss';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const { signup, error, isLoading } = useSignUp();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkDisabled = useCallback(() => {
    let disabled = false;

    Object.values(fieldErrors).forEach(error => {
      if (error) {
        disabled = true;
      }
    });

    if (!email || !password) {
      disabled = true;
    }

    const el = document.querySelector('.button');

    if (el) {
      el.classList.toggle('button--disabled', Boolean(disabled));
    }
  }, [email, password, fieldErrors]);

  useEffect(() => {
    checkDisabled();
  }, [email, password, fieldErrors, checkDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = email.trim() === '' ? 'Email не може бути порожнім' : '';
    const passwordError = password.trim() === '' ? 'Пароль не може бути порожнім' : '';
    
    setFieldErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      const response = await signup(email, password);
      if (response) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { message: 'Реєстрація акаунту' },
        });
        navigate('/signup-confirm');
      }
    }
  };

  return (
    <div className="page page--signup">
      <header className="header">
        <BackButton />
      </header>

      <form className="page_section" onSubmit={handleSubmit}>
        <h1 className="page_title">Sign Up</h1>
        <h3 className="page_description">Choose a registration method</h3>

        <div className="form">
          <div className="form_item">
            <Field
              label="Email"
              type="text"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              setFieldErrors={setFieldErrors}
            />
            {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
            <FieldPassword 
              label="Password"
              placeholder="Enter password"
              onChange={setPassword}
              value={password}
              setFieldErrors={setFieldErrors}
            />
            {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}

            <div className="wrapper_signup">
              <span>Already have an account? </span>
              <Link to="/signin">Sign In</Link>
            </div>
          </div>

          <button
            type="submit"
            className={`button ${isLoading ? 'button--disabled' : ''}`} 
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Continue'}
          </button>
       
          {error && 
            <div className="alert alert--disabled">
              <span className="form_error">{error}</span>
              <img src={Danger} alt="danger"/>
              <span className="danger_span"> A user with this email address already exists</span>
            </div>
          }
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
