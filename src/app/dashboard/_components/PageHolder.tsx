'use client';
// Api & Core imports
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Hooks
import useWindowWidth from '@/hooks/useWindowWidth';
import useUser from '@/hooks/auth/useUser';

const PageHolderForMobileDashboard = () => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const { user, isLoading } = useUser();

  // Redirect to login page if user is not logged in or if the user is logged in and the role is not admin and the window width is greater than 1024 redirect to account page
  useEffect(() => {
    if (
      (!user && !isLoading) ||
      (user && user.role !== 'admin' && !isLoading)
    ) {
      return router.push('/');
    }

    if (user && user.role === 'admin' && !isLoading && windowWidth! >= 1024) {
      return router.push('/dashboard/calculators');
    }
  }, [windowWidth, user, isLoading, router]);

  if (!user && isLoading) {
    return <Loader />;
  }

  return <Loader />;
};

export default PageHolderForMobileDashboard;
