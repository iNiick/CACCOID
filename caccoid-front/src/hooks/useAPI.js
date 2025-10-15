import axios from 'axios';

export const useAPI = (hasFile = false) => {
  let baseURL = 'http://localhost:8080'; // valor padrão

  try {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    const isDocker = hostname.startsWith('172.') || hostname.startsWith('192.');
    const isProduction = !isLocal && !isDocker;

    if (isLocal) {
      baseURL = 'http://localhost:8080';
    } else if (isDocker) {
      baseURL = `http://${hostname}:8080`;
    } else if (isProduction) {
      baseURL =
        import.meta.env.VITE_API_BASE_URL ||
        'https://caccoid-backend.onrender.com';
    }
  } catch (err) {
    console.warn('⚠️ Erro ao detectar ambiente, usando fallback local:', err);
    baseURL = 'http://localhost:8080';
  }

  // Cria a instância do Axios
  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
    },
  });

  // Intercepta requisições (ex: adiciona token)
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Intercepta respostas (ex: trata erros comuns)
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      if (status === 403) console.error('Token inválido ou expirado.');
      if (status === 500) console.error('Erro interno do servidor.');
      return Promise.reject(error);
    }
  );
  return api;
};
