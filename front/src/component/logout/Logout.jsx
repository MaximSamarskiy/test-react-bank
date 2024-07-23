import React from 'react';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from "./useAuthContext";

const LogoutButton = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    
      <nav>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </nav>
    )
 
};

export default LogoutButton;
