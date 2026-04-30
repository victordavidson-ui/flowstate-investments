import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone?: string;
  dob?: string;
  address?: string;
  nationality?: string;
  kycStatus: 'unverified' | 'pending' | 'verified';
  isAdmin?: boolean;
  preferences?: {
    language: string;
    currency: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("netflow_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("netflow_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("netflow_user", JSON.stringify(userData));
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const newUser = { ...prev, ...updates };
      localStorage.setItem("netflow_user", JSON.stringify(newUser));
      return newUser;
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("netflow_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, updateUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
