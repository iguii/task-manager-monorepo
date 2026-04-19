import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
})

export const getTasks = () => API.get('/tasks');

export const createTask = (title: string, desc: string) => API.post("/tasks", { title, description: desc });

export const toggleTask = (id: number) => API.patch(`tasks/${id}/toggle`);

export const updateTask = (id: number) => API.delete(`tasks/${id}`);

export const deleteTask = (id: number) => API.delete(`tasks/${id}`);

