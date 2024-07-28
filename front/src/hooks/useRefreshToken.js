import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRefreshToken = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        return null;
      }

      localStorage.setItem("token", json.accessToken);
      dispatch({ type: "LOGIN", payload: json });
      return json.accessToken;
    } catch (error) {
      setError("Error refreshing token");
      console.error("Refresh Token Error:", error);
      return null;
    }
  };

  return { refreshToken, error };
};
