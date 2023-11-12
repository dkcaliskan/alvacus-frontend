// Api & Core imports
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Dynamic imports
const LoginStates = dynamic(() => import('./_components/LoginStates'), {
  ssr: false,
});

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  alternates: {
    canonical: 'https://alvacus.com/login',
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <section>
        <LoginStates />
      </section>
    </Suspense>
  );
}
