'use client';

// Api & Core imports
import { createContext } from 'react';

// Types
type LoginTypes = {
  username?: string;
  email?: string;
  password: string;
};

type AccessLoginTypes = {
  accessToken: string;
  maxAge: number;
};

type ContextTypes = {
  login?: ({ username, email, password }: LoginTypes) => {};
  accessLogin?: ({ accessToken }: AccessLoginTypes) => {};
  logout?: () => {};
};

export const AuthContext = createContext<ContextTypes>(null!);
