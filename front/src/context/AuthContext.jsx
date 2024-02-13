import React, { createContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  token: null,
  user: null,
};

// Create the authentication context
export const AuthContext = createContext();

// Create a reducer function to handle state transitions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Create an object to provide both state and dispatch function
  const authContextData = {
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
