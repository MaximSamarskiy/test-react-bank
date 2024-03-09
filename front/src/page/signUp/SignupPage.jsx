import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowImg from '../../image/svg/arrow-back.svg';
import Danger from '../../image/svg/danger.svg';
import Field from '../../component/field/Field';
import ParentComponent from '../../component/field-password/ParentComponent';
import { AuthContext } from '../../context/AuthContext';

function SignupPage() {
  const { dispatch } = useContext(AuthContext);
  const [value, setValue] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleInputChange = (value) => {
    console.log(`${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/signup', {
        email: value.username,
        password: value.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log('Signup successful:', user);

        dispatch({ type: 'LOGIN', payload: { token, user } });
      } else {
        console.error('Signup failed:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      setError('Error during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page--signup">
      <header className="header">
        <Link to="/" className="arrow--back">
          <img src={ArrowImg} alt="arrow" />
        </Link>
      </header>

      <form className="page_section" onSubmit={handleSubmit}>
        <h1 className="page_title">Sign Up</h1>
        <h3 className="page_description">Choose a registration method</h3>

        <div className="form">
          <div className="form_item">
            <Field
              name="username"
              label="Email"
              type="text"
              placeholder="Enter username"
              action={handleInputChange}
            />
            <div>
              <ParentComponent />
            </div>

            <div className="wrapper_signup">
              <span>Already have an account? </span> <Link to="/signin">Sign In</Link>
            </div>

            {error && <span className="form_error">{error}</span>}
          </div>

          <input
            type="text"
            name="username"
            value={value.username || ''}
            onChange={handleChange}
          />

          <button
            onClick={handleSignUp}
            type="submit"
            className={`button ${loading ? 'button-disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Continue'}
          </button>

          {error && (
            <span className="alert alert-disabled">
              <img src={Danger} alt="danger" />
              A user with the same name already exists
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
