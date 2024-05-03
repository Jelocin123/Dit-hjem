"use client"
import React, { createContext, useEffect, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

const userLogin = async (loginInfo) => {
  try {
    const response = await fetch(`http://localhost:5333/login/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(loginInfo),
    });

    if (response.status === 200) {
      const user = await response.json();
      return { success: true, user };
    } else {
      return { success: false, error: "Login failed. Please check your credentials." };
    }
  } catch (error) {
    return { success: false, error: "An error occurred while processing your request." };
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (loginInfo) => {
    const result = await userLogin(loginInfo);
  
    if (result.success) {
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    }
  
    return result.success;
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <UserContext.Provider value={{ handleLogin, user, handleSignOut, loading }}>
      {loading ? <div className="d-flex justify-content-center bottom-0 ">
  <div className="spinner-border text-primary " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div> : children}
    </UserContext.Provider>
  )
}
