'use client';
// Api & Core imports
import React, { ReactNode, useEffect } from 'react';

// Contexts & Hooks
import { AuthContext } from '@/context/authContext';
import { useAuth } from '@/hooks/auth/useAuth';

type ProviderTypes = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderTypes) {
  const { login, accessLogin, logout } = useAuth();

  // Check for theme in local storage and set it if it exists if not set it to default of system theme
  useEffect(() => {
    // Check if theme is set in local storage
    const localTheme = localStorage.getItem('theme');

    // If theme not set in local storage, check for system theme and set it
    if (!localTheme) {
      // Check for system theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'mytheme-dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'mytheme-light');
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        accessLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
