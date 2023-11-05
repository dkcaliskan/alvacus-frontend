// Api & Core imports
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Dynamic imports
const ForgotPasswordStates = dynamic(
  () => import('./_components/ForgotPasswordStates'),
  {
    ssr: false,
  }
);

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <section>
        <ForgotPasswordStates />
      </section>
    </Suspense>
  );
}
