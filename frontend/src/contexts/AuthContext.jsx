import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a token stored in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Fetch the user profile if a token is found
      api
        .get("/users/profile")
        .then((res) => {
          setUser(res.data); // Update user state when profile data is fetched
          setLoading(false); // Set loading to false after fetching data
        })
        .catch(() => {
          setLoading(false); // Set loading to false if there's an error
        });
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, []); // Runs once on component mount to check if there's an existing token

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      setUser(res.data.user); // Set the user data after login
      localStorage.setItem("token", res.data.token); // Store the token
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    } catch (error) {
      console.error("Login error:", error); // Log any errors encountered
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });
      setUser(res.data.user); // Set user data after registration
      localStorage.setItem("token", res.data.token); // Store the token
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    } catch (error) {
      console.error("Registration error:", error); // Log any errors encountered
    }
  };

  const logout = () => {
    setUser(null); // Clear the user data
    localStorage.removeItem("token"); // Remove the token from localStorage
    delete api.defaults.headers.common["Authorization"]; // Remove the authorization header
  };

  const guestLogin = async () => {
    try {
      const res = await api.post("/auth/guest-login");
      setUser(res.data.user); // Set user data for guest login
      localStorage.setItem("token", res.data.token); // Store the token
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    } catch (error) {
      console.error("Guest login error:", error); // Log any errors encountered
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, guestLogin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
