import axios from 'axios';
//http://127.0.0.1:8000
//http://api.lasecuriteinfoetvous.com
const apiClient = axios.create({
  baseURL: 'https://api.lasecuriteinfoetvous.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default apiClient;
