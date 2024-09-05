// src/services/apiService.ts
import axios from 'axios';
import {  setToken, removeToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_BASEURL;

// Create an instance of axios with common settings
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add the token to the request headers for authenticated requests
// api.interceptors.request.use(
//     (config) => {
//         const token = getToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; // Add token to request headers
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Handle login and save the token in localStorage
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token } = response.data;

        if (token) {
            setToken(token); // Store the token in localStorage
        }

        return response.data; // Return response data (can include user info, etc.)
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Handle user registration
export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await api.post('/auth/signup', { name, email, password });
        return response.data; // Return response data (can include user info, etc.)
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Logout function (clear token from localStorage)
export const logoutUser = () => {
    removeToken(); // Remove the token from localStorage
};

