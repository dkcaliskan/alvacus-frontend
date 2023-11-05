// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import PageHolderForMobileDashboard from './_components/PageHolder';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const Dashboard: NextPage = () => {
  return (
    <div className='lgMax:hidden'>
      <PageHolderForMobileDashboard />
    </div>
  );
};

export default Dashboard;
