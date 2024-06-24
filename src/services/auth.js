// src/services/authService.js
import axios from 'axios';

export async function isAuthenticated() {
    try {
        const response = await axios.get('/api/auth/check', { withCredentials: true });
        return response.data.authenticated;
    } catch (error) {
        return false;
    }
}
