import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { web3 } from "../util/web3";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [walletId, setWalletId] = useState(Cookies.get("walletId") || null);
  const [derivedWallet, setDerivedWallet] = useState(Cookies.get("derivedWallet") || null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      if (!walletId) {
        navigate("/login");
        return;
      }

      if (!derivedWallet) {
        setIsPopupOpen(true);
      }
    };

    checkSession();
  }, [walletId, derivedWallet, navigate]);

  const handleSaveDerivedWallet = () => {
    if (!walletId || !web3.utils.isAddress(walletId)) {
      alert("Invalid wallet ID. Please log in again.");
      return;
    }

    if (!secret || secret.trim() === "") {
      alert("Secret key cannot be empty.");
      return;
    }

    try {
      const secretHex = web3.utils.utf8ToHex(secret);
      const paddedSecret = web3.utils.padRight(secretHex, 64);

      const derived = web3.utils.keccak256(
        web3.eth.abi.encodeParameters(["address", "bytes32"], [walletId, paddedSecret])
      );

      setDerivedWallet(derived);
      Cookies.set("derivedWallet", derived);
      setIsPopupOpen(false);
      alert("Derived wallet set successfully!");
    } catch (error) {
      console.error("Error deriving wallet:", error);
      alert("Failed to derive wallet. Check your inputs.");
    }
  };

  const logout = () => {
    setWalletId(null);
    setDerivedWallet(null);
    Cookies.remove("walletId");
    Cookies.remove("derivedWallet");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        walletId,
        derivedWallet,
        secret,
        setSecret,
        isPopupOpen,
        setIsPopupOpen,
        handleSaveDerivedWallet,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);