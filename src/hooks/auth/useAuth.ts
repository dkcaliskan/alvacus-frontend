'use client';

// Api & Core imports
import { useCallback } from 'react';
import { AxiosError } from 'axios';

// Hooks & Utils
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import { getUserFromToken } from '@/utils/getUserFromToken';

// Types

type LoginTypes = {
  username?: string;
  email?: string;
  password: string;
};

type AccessLoginTypes = {
  accessToken: string;
};

interface LoginResult {
  success: boolean;
  message?: string;
  error?: string;
}

interface AccessLoginResult {
  success: boolean;
  error?: string;
}

interface ErrorResponse {
  message: string;
}

export function useAuth() {
  // Login function with normal credentials
  const login = useCallback(
    async ({ username, password }: LoginTypes): Promise<LoginResult> => {
      try {
        // Request to the backend to login
        const res: {
          status: number;
          data: { accessToken: string; maxAge: number };
        } = await usePrivateAxios.post('/api/auth/login', {
          username: !username?.includes('@') && username?.toLowerCase().trim(),
          email: username?.includes('@') && username.toLowerCase().trim(),
          password: password.trim(),
        });

        // If the request is successful then get the user info from the token
        if (res.status === 200) {
          // Set expiration date in local storage
          localStorage.setItem('exp', `${res.data.maxAge}`);

          // Return the user info
          getUserFromToken(res.data.accessToken);
          return { success: true };
        }

        // If the request returns an error, return the error message
      } catch (e) {
        const err = e as AxiosError<ErrorResponse>;
        if (!err?.response) {
          return { success: false, error: 'No server response' };
        } else if (err.response?.status === 400) {
          return { success: false, error: 'Missing username or password' };
        } else if (err.response?.status === 401) {
          return { success: false, error: 'Invalid username or password' };
        } else {
          return {
            success: false,
            error: err.response?.data.message || 'Unknown error occurred',
          };
        }
      }

      // If the request didn't return any success or error, return an error message
      return { success: false, error: 'Unknown error occurred' };
    },
    []
  );

  // Login function with access token
  const accessLogin = useCallback(
    async ({ accessToken }: AccessLoginTypes): Promise<AccessLoginResult> => {
      try {
        // Request to the backend to login with access token
        const res: {
          status: number;
          data: { accessToken: string; maxAge: number };
        } = await usePrivateAxios.post('/api/auth/access', {
          userToken: accessToken,
        });

        // If the request is successful then get the user info from the token
        if (res.status === 200) {
          // Set expiration date in local storage
          localStorage.setItem('exp', `${res.data.maxAge}`);

          // Return the user info
          getUserFromToken(res.data.accessToken);
          return { success: true };
        }
      } catch (e) {
        const err = e as AxiosError<ErrorResponse>;
        if (!err?.response) {
          return { success: false, error: 'No server response' };
        } else if (err.response?.status === 400) {
          return { success: false, error: 'Missing username or password' };
        } else if (err.response?.status === 401) {
          return { success: false, error: 'Invalid username or password' };
        } else {
          return {
            success: false,
            error: err.response?.data.message || 'Unknown error occurred',
          };
        }
      }

      // If the request didn't return any success or error, return an error message
      return { success: false, error: 'Unknown error occurred' };
    },
    []
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Remove the token from localStorage
      localStorage.removeItem('exp');

      // Request to the backend to logout the user
      const res: {
        status: number;
      } = await usePrivateAxios.post('/api/auth/logout');

      // If the request is successful then remove the token from localStorage

      if (res.status === 200) {
        return { success: true };
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;

      if (!err?.response) {
        return { success: false, error: 'No server response' };
      } else {
        return {
          success: false,
          error: err.response?.data.message || 'Unknown error occurred',
        };
      }
    }

    // If the request didn't return any success or error, return an error message
    return { success: false, error: 'Unknown error occurred' };
  }, []);

  // Check if the user is logged in and get the user info from the token
  const isLoggedIn = async (url: string) => {
    try {
      // Get the expiration date from localStorage
      const storedExpDate = JSON.parse(localStorage.getItem('exp')!);

      // If the expiration date is still valid then get the user info from the token
      if (Number(storedExpDate) >= new Date().getTime()) {
        // Request to the backend to get the user info
        const res: {
          status: number;
          data: { accessToken: string };
        } = await usePrivateAxios.get(url);

        // If the request is successful then get the user info from the token
        if (res.status === 200) {
          return getUserFromToken(res.data.accessToken);
        }
      }

      // Return null if the user is not logged in or the token has expired
      return null;
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      return null;
      /* if (!err?.response) {
        return 'No server response';
      } else {
        return err.response?.data.message;
      } */
    }
  };

  // Refresh the token every 5 minutes to keep the user logged in
  setInterval(() => {
    isLoggedIn('/api/auth/refresh');
  }, 300000);

  return { login, accessLogin, logout, isLoggedIn };
}
