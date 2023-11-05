// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import ChangePasswordStates from './_components/ChangePasswordStates';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change Password',
};

const ChangePassword: NextPage = async () => {
  return (
    <section>
      <ChangePasswordStates />
    </section>
  );
};

export default ChangePassword;
