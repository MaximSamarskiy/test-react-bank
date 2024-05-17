import { AuthContextProvider } from "./context/AuthContext";
import WelcomePage from "./page/wellcomPage/WellcomePage";
import SignupPage from "./page/signUp/SignupPage";
import SigninPage from "./page/signIn/SigninPage";
import SignupConfirmPage from "./page/signup-comfirm/SignupConfirmPage";
import BalancePage from "./page/balancePage/BalancePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<WelcomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup-comfirm" element={<SignupConfirmPage />} />
            <Route path="/balancePage" element={<BalancePage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
