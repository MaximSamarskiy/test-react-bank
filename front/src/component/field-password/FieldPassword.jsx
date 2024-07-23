import React, { useState } from 'react';
import "./index.scss";

const FieldPassword = ({ name, label, placeholder, value, onChange, setFieldErrors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    let newError = '';
    if (newValue.length < 6) {
      newError = 'Пароль повинен бути не менше 6 символів';
    }

    setError(newError);

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newValue.trim() === '' ? 'Поле не може бути пустим' : newError,
    }));
  };

  return (
    <div className="field field-password">
      <label htmlFor={name} className="field_label">{label}</label>

      <div className="field_wrapper">
        <input
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          className={`field_input ${error ? 'validation--active' : ''}`}
          name={name}
          placeholder={placeholder}
          value={value}
        />
        <button 
          type="button" 
          className={`field_icon ${showPassword ? 'show' : ''}`}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? '👁️':'🙈'}
        </button>
      </div>
      {error && (
        <span className="form__error form__error--active" name={name}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FieldPassword;
