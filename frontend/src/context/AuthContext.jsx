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

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
