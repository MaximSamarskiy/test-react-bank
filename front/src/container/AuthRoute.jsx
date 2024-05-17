import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  // Перевірка стану автентифікації користувача
  const isAuthenticated = true; // Приклад, ви можете замінити це на вашу логіку перевірки

  // Якщо користувач аутентифікований, відображаємо передані компоненти
  if (isAuthenticated) {
    return <Route element={children} />;
  } else {
    // Якщо користувач не аутентифікований, перенаправляємо його на сторінку логіну
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;