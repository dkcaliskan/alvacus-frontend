'use client';
// API & Core
import React, { FunctionComponent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// UI & Icons
import { IoRefreshOutline } from 'react-icons/io5';

// Components
import Pagination from '@/components/Shared/Calculator/Pagination';
import CalculatorCardSkeleton from '@/components/Shared/UiElements/Skeletons/CalculatorCardSkeleton';
import UserCardDashboard from './UserCard';

// Contexts, Hooks
import useUsers from '@/hooks/dashboard-get/useUsers';
import useUser from '@/hooks/auth/useUser';

// Types
import type { UserTypes } from '@/types/user.d';

const UsersListDashboard: FunctionComponent = () => {
  const router = useRouter();
  const params = useSearchParams();

  const search = params.get('search') || '';
  const page = params.get('page');

  const { user, isValidating, isLoading: authUserLoading } = useUser();

  // Get the users data
  const { usersData, isLoading, error, mutate } = useUsers({
    page: page || '1',
    sortType: 'recent',
    search: search || '',
  });

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (
      (!user && !authUserLoading) ||
      (user && user.role !== 'admin' && !authUserLoading)
    ) {
      return router.push('/');
    }
  }, [user, authUserLoading, router]);

  if (isLoading || authUserLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-1'>
        <CalculatorCardSkeleton />
        <CalculatorCardSkeleton />
        <CalculatorCardSkeleton />
      </div>
    );
  }

  // If error occurs while fetching data return refresh button
  if ((error || !usersData) && !isLoading) {
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
  if (usersData && usersData.count === 0 && !isLoading) {
    return (
      <div className=''>
        <div className='text-center mx-auto mt-3 min-h-[150px] max-h-[150px] justify-center'>
          <p>There are no user at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={``}>
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-3'>
        {usersData.users.map((user: UserTypes) => (
          <div key={user._id} className=''>
            <UserCardDashboard user={user} />
          </div>
        ))}
      </div>
      {usersData.count >= 4 && (
        <div>
          <Pagination
            totalPages={usersData.totalPages}
            currentPage={usersData.currentPage}
            count={usersData.count}
          />
        </div>
      )}
    </div>
  );
};

export default UsersListDashboard;
