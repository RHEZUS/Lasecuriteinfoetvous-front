import axios from 'axios';
//http://127.0.0.1:8000
//https://api.lasecuriteinfoetvous.com
const token = localStorage.getItem('token');
const apiClient = axios.create({
  baseURL: 'https://api.lasecuriteinfoetvous.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
});

export default apiClient;
