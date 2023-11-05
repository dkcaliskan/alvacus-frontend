'use client';

// API & Core
import React, { FunctionComponent } from 'react';
import { useSearchParams } from 'next/navigation';

// UI & Icons

// Components
import SeenReports from './SeenReports';
import UnseenReports from './UnseenReports';

// Lazy Components

// Contexts, Hooks

const ReportListDashboard: FunctionComponent = () => {
  const params = useSearchParams();

  const list = params.get('list') || 'all';

  if (list === 'seen') {
    return (
      <div className='min-h-[700px] lgMax:min-h-[200px]'>
        <SeenReports />
      </div>
    );
  }
  return (
    <div className='min-h-[700px] lgMax:min-h-[200px] mt-3'>
      <UnseenReports />
    </div>
  );
};

export default ReportListDashboard;
