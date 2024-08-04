import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../component/back_button/back_button";
import Field from "../../component/field/Field";
import FieldPassword from "../../component/field-password/FieldPassword";
import { useSignIn } from "../../hooks/useSignIn";
import "./index.scss";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const { signin, error, isLoading } = useSignIn();
  const navigate = useNavigate();

  const checkDisabled = useCallback(() => {
    let disabled = false;

    Object.values(fieldErrors).forEach((error) => {
      if (error) {
        disabled = true;
      }
    });

    if (!email || !password) {
      disabled = true;
    }

    const el = document.querySelector(".button");

    if (el) {
      el.classList.toggle("button--disabled", Boolean(disabled));
    }
  }, [email, password, fieldErrors]);

  useEffect(() => {
    checkDisabled();
  }, [email, password, fieldErrors, checkDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password).then(() => navigate("/balance"));
  };

  return (
    <div className="page">
      <header>
        <BackButton />
      </header>
      <form className="page_section" onSubmit={handleSubmit}>
        <h1 className="page_title">Sign In</h1>
        <div className="page_description">Select login method</div>
        <div className="form">
          <div className="form_item">
            <Field
              label="Email"
              type="text"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              setFieldErrors={setFieldErrors}
            />
            <FieldPassword
              label="Password"
              placeholder="Enter password"
              onChange={setPassword}
              value={password}
              setFieldErrors={setFieldErrors}
            />
            {error && <div className="error">{error}</div>}
          </div>

          <div className="wrapper_signup">
            <span>Forgot your password? </span>{" "}
            <Link to="/recovery">Restore</Link>
          </div>
        </div>

        <button
          className={`button ${isLoading ? "button--disabled" : ""}`}
          disabled={isLoading}
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default SigninPage;
