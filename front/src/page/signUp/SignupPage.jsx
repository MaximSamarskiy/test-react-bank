import "./index.scss";
import React, { useState} from 'react';
import { Link} from 'react-router-dom';

import BackButton from "../../component/back_button/back_button";
import Danger from '../../image/svg/danger.svg';
import Field from '../../component/field/Field';
import FieldPassword from "../../component/field-password/FieldPassword";
import { useSignUp } from "../../hooks/useSignUp";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup,error,isLoading} = useSignUp()

  const handleSubmit = async(e) =>{
    e.preventDefault();
   
    await signup(email,password)
    
  }

  return (
    <div className="page page--signup">
      <header className="header">
        <header><BackButton/></header>
      </header>

      <form className="page_section" onSubmit={handleSubmit}>
        <h1 className="page_title">Sign Up</h1>
        <h3 className="page_description">Choose a registration method</h3>

        <div className="form">
          <div className="form_item">
            <Field
              className="form_error"
              label="Email"
              type="text"
              placeholder="Enter email"
              
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FieldPassword 
              className="form_error"
              label="Password"
              type="password"
              placeholder="Enter password"
              onChange={setPassword}
              value={password}
            />

            <div className="wrapper_signup">
              <span>Already have an account? </span> <Link to="/signin">Sign In</Link>
            </div>
          </div>

          <button
            type="submit"
            className={`button ${isLoading ? 'button-disabled' : ''}`} 
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
