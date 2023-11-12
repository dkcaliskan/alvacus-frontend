// Api & Core imports
import React from 'react';

// Components
import UsersSecurePage from './_components/SecurePage';

// Metadata
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Users',
  alternates: {
    canonical: 'https://www.alvacus.com/dashboard/users',
  },
};

const DashboardUsers = () => {
  return <UsersSecurePage />;
};

export default DashboardUsers;
