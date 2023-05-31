import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api', // Remplacez par l'URL de base de votre API
});

// http://10.0.2.2:8000
// Ajouter l'intercepteur pour l'en-tête "Authorization"
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // return Promise.reject(error);
    console.log(error);
  }
);

export default api;