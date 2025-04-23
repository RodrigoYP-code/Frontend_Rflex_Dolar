import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(config => {
  console.log(`[${config.method?.toUpperCase()}] ${config.url}`);
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la respuesta HTTP:', error);
    return Promise.reject(error);
  }
);

export default http;
