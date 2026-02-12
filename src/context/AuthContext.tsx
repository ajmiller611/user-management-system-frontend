/**
 * This defines the global authentication state for the application.
 * It provides methods for logging in, logging out, and restoring sessions.
 * It uses React Context to make the auth state accessible throughout the app
 * without having to pass a user prop down manually at every level.
 */
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import axiosInstance, { setAccessToken } from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

// Definition of authenticated user data returned by the backend
export interface AuthUser {
  userId: number;
  username: string;
  email: string;
  roles: string[];
}

// Definition of the authentication context provided to components
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the authentication context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that holds the authentication state,
 * restores sessions, and provides login/logout methods.
 */
export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Attempt to restore session on initial load using refresh token
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const refreshResponse = await axiosInstance.post('/auth/refresh-token');
        const authHeader = refreshResponse.headers['authorization'];
        if (authHeader?.startsWith('Bearer ')) {
          setAccessToken(authHeader.substring(7));
        }

        const response = await axiosInstance.get<AuthUser>('/auth/me');

        if (isMounted) {
          setUser(response.data);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      // Cleanup function to avoid setting state on unmounted component
      isMounted = false;
    };
  }, []);

  /**
   * Login callback function that sends credentials to the backend
   * for authentication, stores the access token in memory,
   * updates the auth state, and redirects to the dashboard.
   */
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await axiosInstance.post<AuthUser>('/auth/login', {
          username,
          password,
        });

        const authHeader = response.headers['authorization'];
        if (authHeader?.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          setAccessToken(token);
        }

        setUser(response.data);
        router.push('/dashboard');
      } catch (error: unknown) {
        let message = 'Login failed';

        if (error instanceof AxiosError) {
          message = error.response?.data?.message || message;
        }

        throw new Error(message);
      }
    },
    [router],
  );

  // Logout function that clears frontend session state and access token.
  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }

    setAccessToken(null);
    setUser(null);
    router.push('/login');
  }, [router]);

  // Memoize auth context to optimize performance
  const contextValue = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
