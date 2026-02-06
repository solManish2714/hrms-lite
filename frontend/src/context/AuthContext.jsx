import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Auto-login default user to bypass login screen
  const [user, setUser] = useState({ username: "admin" });
  const [token, setToken] = useState("mock-token");

  useEffect(() => {
    // No validation needed for this mode
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/login`, { username, password });
      const accessToken = res.data.access_token;
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      setUser({ username });
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
