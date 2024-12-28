import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [walletId, setWalletId] = useState(Cookies.get("walletId") || null);
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      if (!walletId) {
        navigate("/login");
        return;
      }
    };

    checkSession();
  }, [walletId, navigate]);

  const logout = () => {
    setWalletId(null);
    Cookies.remove("walletId");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        walletId,
        secret,
        setSecret,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);