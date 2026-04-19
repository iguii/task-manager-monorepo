import api from "./api";

export const getTasks = () => api.get('/tasks');

export const createTask = (title: string, desc: string) => api.post("/tasks", { title, description: desc });

export const toggleTask = (id: number) => api.patch(`tasks/${id}/toggle`);

export const updateTask = (id: number) => api.delete(`tasks/${id}`);

export const deleteTask = (id: number) => api.delete(`tasks/${id}`);

