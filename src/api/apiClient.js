import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5197', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
