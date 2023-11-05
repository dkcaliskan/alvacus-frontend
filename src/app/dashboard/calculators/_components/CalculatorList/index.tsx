'use client';

// API & Core
import React, { FunctionComponent } from 'react';
import { useSearchParams } from 'next/navigation';

// UI & Icons

// Components
import AllCalculatorsDashboard from './AllCalculators';
import UnverifiedCalculatorsDashboard from './UnverifiedCalculators';

// Lazy Components

// Contexts, Hooks

const CalculatorListDashboard: FunctionComponent = () => {
  const params = useSearchParams();

  const list = params.get('list') || 'all';

  if (list === 'unverified') {
    return (
      <div className='min-h-[700px] lgMax:min-h-[200px] mt-3'>
        <UnverifiedCalculatorsDashboard />
      </div>
    );
  }
  return (
    <div className='min-h-[700px] lgMax:min-h-[200px] mt-3'>
      <AllCalculatorsDashboard />
    </div>
  );
};

export default CalculatorListDashboard;
