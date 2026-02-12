/**
 * Axios instance used for all API requests in the application.
 *
 * Features:
 * - Sets the base API URL
 * - Attaches the access token to outgoing requests
 * - Attempts to refresh the token on 401 responses
 * - Retries the original request after a successful refresh
 *
 * The access token is stored in memory. Refresh tokens are expected
 * to be handled by the backend using HttpOnly cookies.
 */
import axios from 'axios';

// In-memory storage for the access token to reduce XSS risks
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Attach access token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    throw error;
  },
);

/**
 * Response interceptor to handle token refresh on 401 responses
 * and update access tokens returned in Authorization headers.
 */
axiosInstance.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      setAccessToken(authHeader.substring(7));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes('/auth/refresh-token')) {
      throw error;
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.post('/auth/refresh-token');
        const authHeader = refreshResponse.headers['authorization'];
        if (authHeader?.startsWith('Bearer ')) {
          setAccessToken(authHeader.substring(7));
        }
        return axiosInstance(originalRequest);
      } catch {
        setAccessToken(null);
      }
    }
    throw error;
  },
);

export default axiosInstance;
