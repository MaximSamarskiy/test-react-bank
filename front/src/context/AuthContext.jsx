import React, { createContext, useReducer, useEffect } from "react";
import {
  getTokenSession,
  loadSession,
  saveSession,
} from "../hooks/saveSession";

const initialState = {
  user: null,
  token: getTokenSession(),
  notifications: [],
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        notifications: [
          ...state.notifications,
          {
            message: "User logged in",
            timestamp: new Date(),
            type: "Frame540",
          },
        ],
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        notifications: [
          ...state.notifications,
          {
            message: "User logged out",
            timestamp: new Date(),
            type: "Announcement",
          },
        ],
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            message: action.payload.message,
            timestamp: new Date(),
            type: action.payload.type,
          },
        ],
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const session = loadSession();
    if (session) {
      dispatch({
        type: "LOGIN",
        payload: { user: session.user, token: session.token },
      });
    }
  }, []);

  useEffect(() => {
    saveSession(state);
  }, [state]);

  // const refreshToken = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/auth/refresh-token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       localStorage.setItem('token', data.accessToken);
  //       dispatch({ type: 'REFRESH_TOKEN', payload: { token: data.accessToken } });
  //       saveSession(state);
  //       return data.accessToken;
  //     } else {
  //       console.error('Failed to refresh token:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Failed to refresh token:', error);
  //   }
  //   return null;
  // };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
