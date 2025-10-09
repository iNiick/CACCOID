import axios from 'axios';

export const useAPI = (hasFile) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL ||'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      // Adicione o token de autenticação aqui, se necessário
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403) {
        console.error('Token inválido ou expirado.');
      }
      if (error.response.status === 500) {
        console.error('Erro interno do servidor.');
      }
      return Promise.reject(error);
    }
  );
  return api;
};
