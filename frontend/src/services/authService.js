import axios from 'axios';
const API_URL = 'http://localhost:8080/api/users';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response.data) {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        if (response.data) {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data);
        throw error;
    }
};

export const googleLogin = async (credential) => {
    try {
        const response = await axios.post(`${API_URL}/google`, { credential });
        if (response.data) {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Google login error:', error.response?.data);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
};