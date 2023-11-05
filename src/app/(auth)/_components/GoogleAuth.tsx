'use client';

// Api & Core imports
import React, { FunctionComponent, useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';

// Hooks
import useUser from '@/hooks/auth/useUser';
import { useAuth } from '@/hooks/auth/useAuth';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import { getUserFromToken } from '@/utils/getUserFromToken';
import { AuthContext } from '@/context/authContext';

// Types
type GoogleAuthPageTypes = {
  setError: (error: string) => void;
};

const GoogleAuth: FunctionComponent<GoogleAuthPageTypes> = ({ setError }) => {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { mutate } = useUser();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  const handleCredentialResponse = async (response: any) => {
    const { credential } = response;
    try {
      const res = await usePrivateAxios.post('/api/auth/googleLogin', {
        google_id_token: credential,
      });

      if (!res.data.accessToken) {
        return setError('No server response');
      }

      // Login user
      const loginRes = await auth.accessLogin?.({
        accessToken: res.data.accessToken as string,
      });

      if (!loginRes.success) {
        return setError('No server response');
      }

      // Mutate user
      mutate();

      // Get the previous path from sessionStorage
      const previousPath = sessionStorage.getItem('previousPath');

      // If the previous path exists and is the same as the current path, go back
      if (previousPath && previousPath === pathname) {
        router.back();
      } else {
        router.push('/');
      }
    } catch (err: any) {
      if (!err?.response) {
        setError('No server response');
      } else if (err.response?.status === 400) {
        setError('Missing username or password');
      } else if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <div className='mx-auto'>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleCredentialResponse(credentialResponse);
          }}
          onError={() => {
            setError('Login Failed');
          }}
          type='standard'
          size='large'
          shape='rectangular'
          width={800}
          text='continue_with'
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;
