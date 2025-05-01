
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: "completed" | "pending";
  dueDate: string;
  createdAt: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type UpdateProfileData = {
  name?: string;
  email?: string;
  phone?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};
