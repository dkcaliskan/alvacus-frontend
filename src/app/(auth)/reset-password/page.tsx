// Api & Core imports
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Dynamic imports
const ResetPasswordStates = dynamic(
  () => import('./_components/ResetPasswordStates'),
  {
    ssr: false,
  }
);

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  alternates: {
    canonical: 'https://alvacus.com/reset-password',
  },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <section>
        <ResetPasswordStates />
      </section>
    </Suspense>
  );
}
