import React, { createContext, useReducer } from 'react';


const initialState = {
  token: null,
  user: null,
};


export const AuthContext = createContext();


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


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


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
