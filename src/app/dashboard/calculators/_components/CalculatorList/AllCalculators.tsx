'use client';
// API & Core
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// UI & Icons
import { IoRefreshOutline } from 'react-icons/io5';

// Components
import Pagination from '@/components/Shared/Calculator/Pagination';
import CalculatorCardSkeleton from '@/components/Shared/UiElements/Skeletons/CalculatorCardSkeleton';
import CalculatorCardDashboard from '../CalculatorCard';

// Contexts, Hooks
import useAllCalcs from '@/hooks/calculators/useAllCalcs';

// Types
import { CalculatorTypes } from '@/types/calculators.d';

const AllCalculatorsDashboard: FunctionComponent = () => {
  const params = useSearchParams();

  const page = params.get('page') || 1;
  const sortType = params.get('sort') || 'recent';
  const search = params.get('search') || '';
  const tag = params.get('tag') || '';

  const { calculatorsData, error, isLoading, mutate } = useAllCalcs({
    page,
    sortType,
    search,
    tag,
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
  if ((error || !calculatorsData) && !isLoading) {
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
  if (calculatorsData && calculatorsData.count === 0 && !isLoading) {
    return (
      <div className=''>
        <div className='text-center mx-auto mt-3 min-h-[150px] max-h-[150px] justify-center'>
          <p>
            Oops, no calculator was found.😢 Would you like to create one? 😊
          </p>

          <Link
            href={'/create'}
            className='btn btn-primary rounded-full px-4  flex items-center mx-auto mt-3 w-max'
          >
            Create a calculator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={``}>
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-1'>
        {calculatorsData.calculators.map((calculator: CalculatorTypes) => (
          <div key={calculator._id} className=''>
            <CalculatorCardDashboard calculator={calculator} />
          </div>
        ))}
      </div>
      {calculatorsData.count >= 4 && (
        <div>
          <Pagination
            totalPages={calculatorsData.totalPages}
            currentPage={calculatorsData.currentPage}
            count={calculatorsData.count}
          />
        </div>
      )}
    </div>
  );
};

export default AllCalculatorsDashboard;
