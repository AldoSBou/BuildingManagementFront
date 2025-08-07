import axios from 'axios';
import { config } from '@/config/env';
import { handleApiError, ErrorCodes } from '@/utils/errorHandler';
import { refreshTokenRequest } from './auth';

const client = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request
client.interceptors.request.use((requestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log de requests en desarrollo
  if (config.debug.showApiLogs && config.environment.isDevelopment) {
    console.log(`[API] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`, {
      data: requestConfig.data,
      params: requestConfig.params,
    });
  }
  
  return requestConfig;
}, (error) => {
  // Convertir error de request usando nuestro handler
  return Promise.reject(handleApiError(error));
});

// Variables para manejo de refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor de response
client.interceptors.response.use(
  (response) => {
    // Log de responses exitosos en desarrollo
    if (config.debug.showApiLogs && config.environment.isDevelopment) {
      console.log(`[API] ✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Convertir a AppError usando nuestro handler
    const appError = handleApiError(error);

    // Manejo especial para token expirado
    if (appError.code === ErrorCodes.UNAUTHORIZED && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(handleApiError(err)));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshTokenRequest();
        const newToken = data.token;
        const newRefreshToken = data.refreshToken;

        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        client.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        originalRequest.headers.Authorization = 'Bearer ' + newToken;
        return client(originalRequest);
      } catch (refreshError) {
        const refreshAppError = handleApiError(refreshError);
        processQueue(refreshAppError, null);
        localStorage.clear();
        
        // Solo redirigir si no estamos ya en login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshAppError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(appError);
  }
);

export default client;