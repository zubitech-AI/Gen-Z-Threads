import axios from 'axios';

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  // Ensure no trailing slash
  if (url.endsWith('/')) url = url.slice(0, -1);
  // If it's a Vercel URL and doesn't end with /api, append it
  if (url.includes('vercel.app') && !url.endsWith('/api')) {
    return `${url}/api`;
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
