
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import { LoginCredentials, RegisterCredentials, UpdateProfileData, User } from "@/types";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const response = await api.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.login(credentials);
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        toast.success("Login successful");
        return true;
      } else {
        toast.error(response.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.register(credentials);
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        toast.success("Registration successful");
        return true;
      } else {
        toast.error(response.message || "Registration failed");
        return false;
      }
    } catch (error) {
      console.error("Registration error", error);
      toast.error("Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await api.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.updateProfile(data);
      if (response.success && response.data) {
        setUser(response.data);
        toast.success("Profile updated successfully");
        return true;
      } else {
        toast.error(response.message || "Profile update failed");
        return false;
      }
    } catch (error) {
      console.error("Profile update error", error);
      toast.error("Profile update failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
