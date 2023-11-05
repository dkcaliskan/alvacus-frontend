'use client';

// Api & Core imports
import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Components
import SearchReportsDashboard from './Search';
import ReportListSelectDashboard from './ListSelect';
import ReportListDashboard from './ReportList';
import Loader from '@/components/Shared/UiElements/Loader';
import DashboardNav from '../../_components/DashboardNav';

// Hooks
import useUser from '@/hooks/auth/useUser';

const ReportsSecurePage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (
      (!user && !isLoading) ||
      (user && user.role !== 'admin' && !isLoading)
    ) {
      return router.push('/');
    }
  }, [user, isLoading, router]);

  if (user && user.role === 'admin' && !isLoading) {
    return (
      <section className='container mx-auto lg:my-3 lg:px-3 font-main pb-3 lg:grid lg:grid-cols-9 lg:gap-6 lgMax:mt-3'>
        <section className='w-full lg:col-start-1 col-span-2 '>
          <Suspense fallback={<Loader />}>
            <DashboardNav />
          </Suspense>
        </section>
        <section className='lg:col-span-7'>
          <SearchReportsDashboard />

          <section className='flex items-center justify-between border-b-[1px] custom-border-color'>
            <div className='lgMax:px-1.5 hidden'>
              <h1 className='text-2xl font-bold line-clamp-1'>
                Alvacus Reports
              </h1>
            </div>

            <div className='pb-[1px]'>
              <ReportListSelectDashboard />
            </div>
            <div>{/* <SortCalcsDashboard /> */}</div>
          </section>

          <section>
            <ReportListDashboard />
          </section>
        </section>
      </section>
    );
  }

  return <div></div>;
};

export default ReportsSecurePage;
