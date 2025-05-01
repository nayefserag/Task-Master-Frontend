
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/services/api";
import { Task } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "@/components/ui/sonner";

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  createTask: (task: Omit<Task, "id" | "userId" | "createdAt">) => Promise<boolean>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
  filterTasks: (status?: string, searchTerm?: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isAuthenticated) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await api.getTasks();
        if (response.success && response.data) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch tasks", error);
        toast.error("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [isAuthenticated]);

  const createTask = async (task: Omit<Task, "id" | "userId" | "createdAt">): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.createTask(task);
      if (response.success && response.data) {
        setTasks(prev => [response.data!, ...prev]);
        toast.success("Task created successfully");
        return true;
      } else {
        toast.error(response.message || "Failed to create task");
        return false;
      }
    } catch (error) {
      console.error("Create task error", error);
      toast.error("Failed to create task");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.updateTask(id, updates);
      if (response.success && response.data) {
        setTasks(prev => prev.map(task => task.id === id ? response.data! : task));
        toast.success("Task updated successfully");
        return true;
      } else {
        toast.error(response.message || "Failed to update task");
        return false;
      }
    } catch (error) {
      console.error("Update task error", error);
      toast.error("Failed to update task");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.deleteTask(id);
      if (response.success) {
        setTasks(prev => prev.filter(task => task.id !== id));
        toast.success("Task deleted successfully");
        return true;
      } else {
        toast.error(response.message || "Failed to delete task");
        return false;
      }
    } catch (error) {
      console.error("Delete task error", error);
      toast.error("Failed to delete task");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const filterTasks = (status?: string, searchTerm?: string): Task[] => {
    return tasks.filter(task => {
      const matchesStatus = status ? task.status === status : true;
      const matchesSearch = searchTerm 
        ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        : true;
      
      return matchesStatus && matchesSearch;
    }).sort((a, b) => {
      // Sort by status (completed at the bottom) and then by due date (oldest first)
      if (a.status !== b.status) {
        return a.status === "completed" ? 1 : -1;
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        createTask,
        updateTask,
        deleteTask,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
