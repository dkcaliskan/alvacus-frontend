// Api & Core imports
import React from 'react';

// Components
import ReportsSecurePage from './_components/SecurePage';

// Metadata
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Reports',
  alternates: {
    canonical: 'https://alvacus.com/dashboard/reports',
  },
};

const DashboardReports = () => {
  return <ReportsSecurePage />;
};

export default DashboardReports;
