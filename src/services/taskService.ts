import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:300/api/v1/tasks',
})

export const getTasks = () => API.get('/');

export const createTask = (data: {
    title: string;
    description?: string;
    tags?: string[];
}) => API.post("/", data);

export const toggleTask = (id: number) => API.patch(`/${id}/toggle`);

export const updateTask = (id: number) => API.delete(`/${id}`);

