import { AuthProvider } from "./context/AuthContext";
import WelcomePage from "./page/wellcomPage/WellcomePage";
import SignupPage from "./page/signUp/SignupPage";
import SigninPage from "./page/signIn/SigninPage";
import SignupConfirm from "./page/signup-comfirm/SignupConfirmPage";
import PrivateRoute from "./container/privateRoute";
import AuthRoute from "./container/AuthRoute";
import BalancePage from "./page/balancePage/BalancePage";
import RecoveryPage from "./page/recovery/RecoveryPage";
import RecoveryConfirmPage from "./page/recovery-confirm/RecoveryConfirmPage";
import NotificationsPage from "./page/notification page/NotificationsPage";
import SettingsPage from "./page/settings page/SettingsPage";
import SendPage from "./page/SendPage/SendPage";
import TransactionPage from "./page/transactionPage/TransactionPage";
import ReceivePage from "./page/receivePage/ReceivePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <WelcomePage />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignupPage />
                </AuthRoute>
              }
            />
            <Route
              path="/signup-confirm"
              element={
                <PrivateRoute>
                  <SignupConfirm />
                </PrivateRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <AuthRoute>
                  <SigninPage />
                </AuthRoute>
              }
            />
            <Route
              path="/recovery"
              element={
                <AuthRoute>
                  <RecoveryPage />
                </AuthRoute>
              }
            />
            <Route
              path="/recovery-confirm"
              element={
                <AuthRoute>
                  <RecoveryConfirmPage />
                </AuthRoute>
              }
            />
            <Route
              path="/balance"
              element={
                <PrivateRoute>
                  <BalancePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/receive"
              element={
                <PrivateRoute>
                  <ReceivePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/send"
              element={
                <PrivateRoute>
                  <SendPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/transaction/:transactionId"
              element={
                <PrivateRoute>
                  <TransactionPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
