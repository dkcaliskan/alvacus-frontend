// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import ChangePasswordStates from './_components/ChangePasswordStates';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change Password',
  alternates: {
    canonical: 'https://alvacus.com/profile/settings/change-password',
  },
};

const ChangePassword: NextPage = async () => {
  return (
    <section>
      <ChangePasswordStates />
    </section>
  );
};

export default ChangePassword;
