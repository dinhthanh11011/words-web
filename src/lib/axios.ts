import axios from 'axios';
import store from '@/store';
import { setToken, clearToken, clearUser } from '@/store/userSlice';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err instanceof Error ? err : new Error(String(err))));
      }

      isRefreshing = true;

      try {
        const res = await axios.get('/auth/refresh', {
          baseURL: instance.defaults.baseURL,
          withCredentials: true, 
        });
        const newToken = res.data.token;

        localStorage.setItem('token', newToken);
        store.dispatch(setToken(newToken));

        processQueue(null, newToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError instanceof Error ? refreshError : new Error(String(refreshError)), null);
        store.dispatch(clearToken());
        store.dispatch(clearUser());
        return Promise.reject(refreshError instanceof Error ? refreshError : new Error(String(refreshError)));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default instance;
