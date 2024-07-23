import React, { useState } from 'react';
import './index.scss';

const Field = ({ name, label, type, placeholder, onChange, value, setFieldErrors }) => {
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { value } = event.target;

    if (value.trim() === '') {
      handleError(name, 'Заповніть вірно поле');
    } else {
      handleError(name, '');
    }

    onChange(event);
  };

  const handleError = (name, error) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    
    if (setFieldErrors) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  return (
    <div className={`field ${errors[name] ? 'validation--active' : ''}`} name={name}>
      <label htmlFor={name} className="field_label">{label}</label>
      <input
        onInput={handleInput}
        type={type}
        className={`field_input ${errors[name] ? 'validation--active' : ''}`}
        name={name}
        placeholder={placeholder}
        value={value}
      />
      {errors[name] && (
        <span className="form__error form__error--active" name={name}>
          {errors[name]}
        </span>
      )}
    </div>
  );
};

export default Field;
