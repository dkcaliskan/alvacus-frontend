'use client';
// Api & Core imports
import React, { FunctionComponent } from 'react';
import { useParams } from 'next/navigation';

// UI & Icons
import { IoRefreshOutline } from 'react-icons/io5';

// Components
import CalculatorCard from '@/components/Shared/Calculator/CalculatorCard';
import UserCalculatorPagination from '../Pagination';
import CalculatorCardSkeleton from '@/components/Shared/UiElements/Skeletons/CalculatorCardSkeleton';

// Hooks
import useSavedCalcs from '@/hooks/calculators/useSavedCalcs';

// Types
import type { CalculatorTypes } from '@/types/calculators.d';

type UserSavedCalculatorListTypes = {
    selectedSort: string;
};

const UserSavedCalculatorList: FunctionComponent<UserSavedCalculatorListTypes> = ({selectedSort}) => {
  const { id } = useParams();

  const [selectedPage, setSelectedPage] = React.useState(1);

  const { calculatorsData, error, isLoading, mutate } = useSavedCalcs({
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
          <p>Oops, no calculator was found.😢</p>
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

export default UserSavedCalculatorList;
