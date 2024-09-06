import axios from 'axios';
import { setToken, removeToken } from '../utils/auth';
console.log("import.meta.env.VITE_BASEURL:", import.meta.env.VITE_BASEURL);

const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token } = response.data;

        if (token) {
            setToken(token);
        }

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};


export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await api.post('/auth/signup', { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};


export const logoutUser = () => {
    removeToken();
};

