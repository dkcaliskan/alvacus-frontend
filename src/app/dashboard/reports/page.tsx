// Api & Core imports
import React from 'react';

// Components
import ReportsSecurePage from './_components/SecurePage';

// Metadata
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Reports',
};

const DashboardReports = () => {
  return <ReportsSecurePage />;
};

export default DashboardReports;
