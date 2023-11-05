'use client';
// Api & Core imports
import React, { FunctionComponent } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// UI & Icons
import { IoRefreshOutline } from 'react-icons/io5';

// Components
import CalculatorCard from '@/components/Shared/Calculator/CalculatorCard';
import UserCalculatorPagination from '../Pagination';
import CalculatorCardSkeleton from '@/components/Shared/UiElements/Skeletons/CalculatorCardSkeleton';

// Hooks
import useMyCalcs from '@/hooks/calculators/useMyCalcs';

// Types
import type { CalculatorTypes } from '@/types/calculators.d';

type UserCreatedCalculatorsListTypes = {
    selectedSort: string;
};

const UserCreatedCalculatorsList: FunctionComponent<UserCreatedCalculatorsListTypes> = ({selectedSort}) => {
  const { id } = useParams();

  const [selectedPage, setSelectedPage] = React.useState(1);

  const { calculatorsData, error, isLoading, mutate } = useMyCalcs({
    page: selectedPage,
    tag: 'all',
    userId: id,
    sortType: selectedSort,
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

  if (calculatorsData && calculatorsData.count === 0 && !isLoading) {
    return (
      <div className=''>
        <div className='text-center mx-auto mt-3 min-h-[150px] max-h-[150px] justify-center'>
          <p>
            Oops, no calculator was found.😢 Would you like to create one? 😊
          </p>

          <Link
            href={'/create'}
            prefetch={false}
            className='btn btn-primary rounded-full px-4  flex items-center mx-auto mt-3 w-max'
          >
            Create a calculator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-1'>
        {calculatorsData.calculators.map((calculator: CalculatorTypes) => (
          <div key={calculator._id} className=''>
            <CalculatorCard userId={id} calculator={calculator} />
          </div>
        ))}
      </div>

      {calculatorsData.count >= 4 && (
        <div>
          <UserCalculatorPagination
            totalPages={calculatorsData.totalPages}
            currentPage={calculatorsData.currentPage}
            count={calculatorsData.count}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserCreatedCalculatorsList;
