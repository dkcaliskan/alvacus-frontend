'use client';

// Api & Core imports
import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Components
import SearchCalcsDashboard from './Search';
import ListSelectDashboard from './ListSelect';
import SortCalcsDashboard from './SortCalcs';
import CalculatorListDashboard from './CalculatorList';
import Loader from '@/components/Shared/UiElements/Loader';
import DashboardNav from '../../_components/DashboardNav';

// Hooks
import useUser from '@/hooks/auth/useUser';

const CalculatorsSecurePage = () => {
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

  if (!user && isLoading) {
    return <Loader />;
  }

  if (user && user.role === 'admin' && !isLoading) {
    return (
      <section className='container mx-auto lg:my-3 lg:px-3 font-main pb-3 lg:grid lg:grid-cols-9 lg:gap-6 lgMax:mt-3'>
        <section className='w-full lg:col-start-1 col-span-2 '>
          <Suspense fallback={<Loader />}>
            <DashboardNav />
          </Suspense>
        </section>
        <section className='lg:col-span-7'>
          <SearchCalcsDashboard />

          <section className='flex items-center justify-between border-b-[1px] custom-border-color'>
            <div className='lgMax:px-1.5 hidden'>
              <h1 className='text-2xl font-bold line-clamp-1'>
                Alvacus All Calculators
              </h1>
            </div>

            <div>
              <ListSelectDashboard />
            </div>
            <div>
              <SortCalcsDashboard />
            </div>
          </section>

          <section>
            <CalculatorListDashboard />
          </section>
        </section>
      </section>
    );
  }

  return <div></div>;
};

export default CalculatorsSecurePage;
