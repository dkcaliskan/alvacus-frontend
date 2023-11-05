'use client';

// API & Core
import React, { FunctionComponent } from 'react';
import { useSearchParams } from 'next/navigation';

// UI & Icons

// Components
import AllCalculators from './AllCalculators';
import MyCalculators from './MyCalculators';
import SavedCalculatorList from './SavedCalculators';

// Lazy Components

// Contexts, Hooks

const CalculatorList: FunctionComponent = () => {
  const params = useSearchParams();

  const list = params.get('list') || 'all';

  if (list === 'saved') {
    return (
      <div className='min-h-[700px] lgMax:min-h-[200px]'>
        <SavedCalculatorList />
      </div>
    );
  }

  if (list === 'my') {
    return (
      <div className='min-h-[700px] lgMax:min-h-[200px]'>
        <MyCalculators />
      </div>
    );
  }
  return (
    <div className='min-h-[700px] lgMax:min-h-[200px]'>
      <AllCalculators />
    </div>
  );
};

export default CalculatorList;
