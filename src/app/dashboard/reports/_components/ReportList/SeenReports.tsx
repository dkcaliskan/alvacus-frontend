'use client';
// API & Core
import React, { FunctionComponent } from 'react';
import { useSearchParams } from 'next/navigation';

// UI & Icons
import { IoRefreshOutline } from 'react-icons/io5';

// Components
import Pagination from '@/components/Shared/Calculator/Pagination';
import CalculatorCardSkeleton from '@/components/Shared/UiElements/Skeletons/CalculatorCardSkeleton';
import ReportCardDashboard from '../ReportCard';

// Contexts, Hooks
import useReports from '@/hooks/dashboard-get/reports/useReports';

// Types
import type { ReportTypes } from '@/types/report.d';

const SeenReports: FunctionComponent = () => {
  const params = useSearchParams();

  const search = params.get('search') || '';
  const page = params.get('page');

  // Get the reports data
  const { reportsData, isLoading, error, mutate } = useReports({
    page: page || '1',
    sortType: 'recent',
    search: search || '',
  });

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-1'>
        <CalculatorCardSkeleton />
        <CalculatorCardSkeleton />
        <CalculatorCardSkeleton />
      </div>
    );
  }

  // If error occurs while fetching data return refresh button
  if ((error || !reportsData) && !isLoading) {
    return (
      <div className=''>
        <div className='text-center mx-auto mt-3 min-h-[150px] max-h-[150px]  justify-center'>
          <p>Oops, Something went wrong. Please try again.</p>
          <button
            type='button'
            className='btn btn-primary rounded-full px-6 flex items-center mx-auto mt-3'
            onClick={() => mutate()}
          >
            <IoRefreshOutline size={23} className='mr-1.5' />
            Try again
          </button>
        </div>
      </div>
    );
  }

  // If no calculators found return create calculator button
  if (reportsData && reportsData.count === 0 && !isLoading) {
    return (
      <div className=''>
        <div className='text-center mx-auto mt-3 min-h-[150px] max-h-[150px] justify-center'>
          <p>There are no reports at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={``}>
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-3'>
        {reportsData.reports.map((report: ReportTypes) => (
          <div key={report._id} className=''>
            <ReportCardDashboard report={report} />
          </div>
        ))}
      </div>
      {reportsData.count >= 4 && (
        <div>
          <Pagination
            totalPages={reportsData.totalPages}
            currentPage={reportsData.currentPage}
            count={reportsData.count}
          />
        </div>
      )}
    </div>
  );
};

export default SeenReports;
