import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import type { User, LoginCredentials, RegisterCredentials } from "../types";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (creds: LoginCredentials) => Promise<User>;
  register: (creds: RegisterCredentials) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Axios defaults: include credentials (cookies)
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check for existing authentication on app load
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        // User is not authenticated, which is fine
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (creds: LoginCredentials) => {
    const res = await axios.post(`${API}/api/auth/login`, creds, {
      withCredentials: true,
    });
    setUser(res.data);
    return res.data as User;
  };

  const register = async (creds: RegisterCredentials) => {
    const res = await axios.post(`${API}/api/auth/register`, creds, {
      withCredentials: true,
    });
    setUser(res.data);
    return res.data as User;
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      // Even if logout fails on backend, clear user locally
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
