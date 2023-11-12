// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import CalculatorsSecurePage from './_components/SecurePage';

// Metadata
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Calculators',
  alternates: {
    canonical: 'https://www.alvacus.com/dashboard/calculators',
  },
};

const DashboardCalculators: NextPage = async () => {
  return <CalculatorsSecurePage />;
};

export default DashboardCalculators;
