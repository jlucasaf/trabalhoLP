import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
    baseURL: 'http://localhost:3000/api', 
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  
  api.interceptors.request.use(
      async (config) => {
          const token = await AsyncStorage.getItem('token');
          if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
export default api;