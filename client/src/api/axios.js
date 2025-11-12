// import axios from 'axios';
// import { auth } from '../firebase';

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
// });

// // Add Firebase token to requests
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const user = auth.currentUser;
//     if (user) {
//       const token = await user.getIdToken();
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from 'axios';
import { getAuth } from 'firebase/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api'
});

api.interceptors.request.use(async (config) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // ignore token attach errors
    console.warn('Token attach failed', err);
  }
  return config;
}, (err) => Promise.reject(err));

export default api;
