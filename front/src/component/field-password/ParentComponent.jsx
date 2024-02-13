import  { useState } from 'react';
import FieldPassword from './FieldPassword';

const ParentComponent = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (newPassword, callback) => {
    setPassword(newPassword);
    callback(); 
  };

  return (
    <div>
      <FieldPassword
        name="passwordField"
        label="Password"
        placeholder="Enter password"
        value={password}
        action={handlePasswordChange}
      />
    </div>
  );
};

export default ParentComponent;
