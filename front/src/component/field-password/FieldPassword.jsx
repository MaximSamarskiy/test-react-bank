import "./index.scss"
import  { useState } from 'react';

const FieldPassword = ({ name, label, placeholder, value, action }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    action(newValue, () => {
      console.log(newValue);
    });
  };

  return (
    <div className="field field-password">
      <label htmlFor={name} className="field_label">{label}</label>

      <div className="field_wrapper">
        <input
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'} 
          className="field_input" 
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
