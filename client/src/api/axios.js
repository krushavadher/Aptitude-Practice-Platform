import axios from 'axios';

let interceptorCallback = null;

export const setAuthInterceptorCallback = (callback) => {
  interceptorCallback = callback;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 on non-auth routes
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login') && !error.config.url.includes('/auth/register')) {
      if (interceptorCallback) {
        interceptorCallback();
      }
    }

    const customError = new Error();
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    
    if (error.response?.data?.message) {
      customError.message = error.response.data.message;
    } else if (error.message) {
      customError.message = error.message;
    } else {
      customError.message = 'An unexpected error occurred. Please try again.';
    }

    return Promise.reject(customError);
  }
);

export default api;
