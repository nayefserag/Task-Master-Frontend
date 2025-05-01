
import { LoginCredentials, RegisterCredentials, Task, UpdateProfileData, User, ApiResponse } from "@/types";
import axios from "axios";

const API_BASE_URL = "https://task-master-backend-weld.vercel.app/api";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      
      return { success: true, data: user };
    } catch (error: any) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Invalid email or password" 
      };
    }
  },
  
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.post("/auth/register", credentials);
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      
      return { success: true, data: user };
    } catch (error: any) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration failed" 
      };
    }
  },
  
  logout: async (): Promise<ApiResponse<null>> => {
    localStorage.removeItem("token");
    return { success: true };
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.get("/users/me");
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Get current user error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to get user data" 
      };
    }
  },
  
  updateProfile: async (data: UpdateProfileData): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.put("/users/me", data);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Update profile error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to update profile" 
      };
    }
  },

  getTasks: async (): Promise<ApiResponse<Task[]>> => {
    try {
      const response = await apiClient.get("/tasks");
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Get tasks error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to get tasks" 
      };
    }
  },
  
  createTask: async (task: Omit<Task, "id" | "userId" | "createdAt">): Promise<ApiResponse<Task>> => {
    try {
      const response = await apiClient.post("/tasks", task);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Create task error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to create task" 
      };
    }
  },
  
  updateTask: async (id: string, updates: Partial<Task>): Promise<ApiResponse<Task>> => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, updates);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Update task error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to update task" 
      };
    }
  },
  
  deleteTask: async (id: string): Promise<ApiResponse<null>> => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      return { success: true };
    } catch (error: any) {
      console.error("Delete task error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to delete task" 
      };
    }
  },
};
