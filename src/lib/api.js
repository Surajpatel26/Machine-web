import axios from 'axios';

const api = axios.create({
  baseURL: ' http://localhost:5000/api',
  // baseURL: 'https://machine-server-tv78.onrender.com/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smg_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('smg_token');
    }
    return Promise.reject(error);
  }
);

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = api.defaults.baseURL || '';
  return `${baseUrl.replace(/\/api$/, '')}${path}`;
};

export default api;

