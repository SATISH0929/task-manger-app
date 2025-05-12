import axios from "axios";


const API_URL = "https://task-manger-app-delta.vercel.app/api/tasks"; 

export const fetchTasks = () => axios.get(API_URL);
export const createTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const searchTasks = (query) => axios.get(`${API_URL}/search?q=${query}`);
