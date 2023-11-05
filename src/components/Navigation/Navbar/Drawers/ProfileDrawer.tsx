'use client';

// API & Core
import React, { useState, FunctionComponent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Components
import ProfileSidebar from '@/components/Shared/ProfileSidebar';
import Avatar from '@/components/Shared/UiElements/Avatar';

// Hooks
import useUser from '@/hooks/auth/useUser';

// Constants
import { PROFILE_PLACEHOLDER } from '@/constants/ImageConstants';

const ProfileDrawer: FunctionComponent = () => {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  // Profile Drawer State
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  // Unset Background Scrolling to use when SideDrawer/Modal if not closed properly
  useEffect(() => {
    document.body.style.overflow = 'unset';
    setIsProfileDrawerOpen(false);

    //! Disabling this eslint rule because preventing the useEffect from running on every render is not necessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const sideDrawerHandler = async () => {
    if (isProfileDrawerOpen) {
      // Unset Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = 'unset';

      setIsProfileDrawerOpen(false);
    } else {
      setIsProfileDrawerOpen(true);

      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      document.body.style.overflow = 'hidden';
    }
  };

  // If user loading, show loader
  if (isLoading && !user) {
    return (
      <div className='lg:hidden'>
        <button className='btn gap-1 normal-case btn-ghost '>
          <Image
            src={PROFILE_PLACEHOLDER}
            width={256}
            height={256}
            className='mask mask-squircle max-w-[60px] -mt-1 animate-pulse w-[35px]'
            alt={`Alvacus profile picture placeholder`}
          />
        </button>
      </div>
    );
  }

  // If no user, show login button
  if (!isLoading && !user) {
    return (
      <div className='lg:hidden'>
        <Link
          href={'/login'}
          as={'/login'}
          className='btn gap-1 normal-case btn-ghost '
        >
          <Image
            src={PROFILE_PLACEHOLDER}
            width={256}
            height={256}
            className='mask mask-squircle max-w-[60px] -mt-1 w-[35px]'
            alt={`Alvacus profile picture placeholder`}
          />
        </Link>
      </div>
    );
  }

  return (
    <div className=' lg:hidden'>
      <button onClick={() => sideDrawerHandler()} className=''>
        <div className='btn btn-ghost max-w-[60px]'>
          <div className=' items-center '>
            <Avatar
              width={256}
              height={256}
              customStyle='w-[35px] md:w-[35px]'
            />
          </div>
        </div>
      </button>
      {isProfileDrawerOpen && (
        <div>
          <div
            className={`absolute bg-base-100 z-50 h-screen w-full top-0 left-0 overflow-x-auto p-1.5`}
          >
            <button
              onClick={() => sideDrawerHandler()}
              aria-label='Toggle Tags Drawer'
              type='button'
              className='btn btn-square btn-ghost lg:hidden mt-0.5 -ml-1 '
            >
              <svg
                className='fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 512 512'
              >
                <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
              </svg>
            </button>
            <ProfileSidebar setIsProfileDrawerOpen={setIsProfileDrawerOpen} />
          </div>
          <div
            className='fixed left-0 top-[65px] w-screen h-screen z-30 bg-black/50'
            onClick={() => sideDrawerHandler()}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProfileDrawer;
