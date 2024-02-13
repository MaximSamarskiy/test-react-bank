// import React, {
//   createContext,
//   useReducer,
//   useState,
//   useEffect,
// } from "react";
import AuthProvider from "./context/AuthContext";
import WellcomePage from "./page/wellcomPage/WellcomePage";
import SignupPage from "./page/signUp/SignupPage";
import SigninPage from "./page/signIn/SigninPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<WellcomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
