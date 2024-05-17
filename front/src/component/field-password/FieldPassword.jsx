import React, { useState } from 'react';
import "./index.scss"

const FieldPassword = ({ name, label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="field field-password">
      <label htmlFor={name} className="field_label">{label}</label>

      <div className="field_wrapper">
        <input
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'} 
          className="field_input validation" 
          name={name} 
          placeholder={placeholder} 
          value={value}  
        />
        <button 
          type="button" 
          className={`field_icon ${showPassword ? 'show' : ''}`}
          onClick={togglePasswordVisibility}
        />
      </div>
    </div>
  );
};

export default FieldPassword;
