import axios from "axios";
import { createContext, useContext, useState } from "react";

// Create a place where authentication information can be shared.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // Login user
  const login = async (email, password) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    const newToken = response.data.token;

    localStorage.setItem("token", newToken);
    setToken(newToken);

    return response.data;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// This hook is intentionally colocated with AuthProvider because it consumes
// the provider's context. The export is excluded from the fast-refresh check.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};