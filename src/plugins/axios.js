import axios from 'axios';
//http://127.0.0.1:8000
//http://api.lasecuriteinfoetvous.com
const token = localStorage.getItem('token');
const apiClient = axios.create({
  baseURL: 'http://api.lasecuriteinfoetvous.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
});

export default apiClient;
