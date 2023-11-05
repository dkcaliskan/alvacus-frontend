'use client';

// Api & Core imports
import React, { FunctionComponent, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// UI & Icon imports
import { FaArrowLeft } from 'react-icons/fa';

// Types
type GoBackTypes = {
  customStyle?: string;
};

const GoBack: FunctionComponent<GoBackTypes> = ({ customStyle }) => {
  const router = useRouter();
  const pathname = usePathname();

  const goBackHandler = async () => {
    // Get the previous path from sessionStorage
    const previousPath = sessionStorage.getItem('previousPath');

    // Get the settings path
    const settingsPath = pathname.split('/settings')[1];

    // If the settings path exists and is one of the following, go back to the settings page
    if (
      settingsPath &&
      (settingsPath === '/account' ||
        settingsPath === '/change-password' ||
        settingsPath === '/delete-account' ||
        settingsPath === '/notifications' ||
        settingsPath === '/privacy')
    ) {
      return router.push('/profile/settings');
    }

    // If the previous path exists and is the same as the current path, go back
    if (previousPath && previousPath === pathname && !settingsPath) {
      return router.back();
    } else {
      return router.push('/');
    }
  };

  useEffect(() => {
    // Save the previous path in sessionStorage
    sessionStorage.setItem('previousPath', pathname);

    // Remove the previous path from sessionStorage when the component unmounts
    return () => {
      sessionStorage.removeItem('previousPath');
    };
  }, [pathname]);

  return (
    <div>
      {pathname !== '/' && (
        <button
          type='button'
          id='go-back'
          aria-label='Go back'
          className={`${customStyle} btn btn-ghost `}
          onClick={goBackHandler}
        >
          <FaArrowLeft size={20} />
        </button>
      )}
    </div>
  );
};

export default GoBack;
