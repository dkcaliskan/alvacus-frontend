// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import AccountStates from './_components/AccountStates';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings',
};

const AccountSettings: NextPage = async () => {
  return (
    <section>
      <AccountStates />
    </section>
  );
};

export default AccountSettings;