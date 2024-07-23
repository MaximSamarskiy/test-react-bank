import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("Signup response:", json);

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "Unknown error");
        return null;
      }
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
        return json;
      }
    } catch (error) {
      setIsLoading(false);
      setError("Ошибка при регистрации");
      console.error("Signup Error:", error);
      return null;
    }
  };

  return { signup, isLoading, error };
};
