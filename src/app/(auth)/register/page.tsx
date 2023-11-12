// Api & Core imports
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Dynamic imports
const RegisterStates = dynamic(() => import('./_components/RegisterStates'), {
  ssr: false,
});

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  alternates: {
    canonical: 'https://www.alvacus.com/register',
  },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<Loader />}>
      <section>
        <RegisterStates />
      </section>
    </Suspense>
  );
}
