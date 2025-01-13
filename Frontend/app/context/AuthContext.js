import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook for accessing AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDocsVerified, setIsDocsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user on app load
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Simulate a server request to check document verification
          // const response = await fetch(
          //   `https://your-api.com/check-docs/${parsedUser.id}`
          // );
          // const { docsVerified } = await response.json();
          // setIsDocsVerified(docsVerified);
          setIsDocsVerified(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      //Assume document verification is part of userData
      //setIsDocsVerified(userData.docsVerified || false);
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("user");
      setUser(null);
      setIsDocsVerified(false);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isDocsVerified,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
