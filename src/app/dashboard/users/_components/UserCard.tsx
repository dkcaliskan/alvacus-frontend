'use client';

// API & Core
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import DeleteUser from './DeleteUser';

// Contexts, Hooks
import useRelativeTime from '@/hooks/useRelativeTime';
import useUser from '@/hooks/auth/useUser';

// Types
import type { UserCardTypes } from '@/types/user.d';

const UserCardDashboard: FunctionComponent<UserCardTypes> = ({ user }) => {
  const { user: authorizedUser, isLoading } = useUser();

  const controlledDate = useRelativeTime(user.createdAt);

  const blurredUrl =
    user && user.avatar != undefined
      ? user.avatar.split('/upload')[0] +
        '/blur:1200' +
        user.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  return (
    <div className='rounded-box custom-bg-color hover:shadow-lg hover:opacity-[0.88] transition ease-in-out duration-200  lgMax:rounded-md min-h-[180px] max-h-[180px] z-10'>
      <div className='card-body px-0 py-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center lgMax:pl-1.5 pl-3 pt-[8.5px]'>
            <div className='mask mask-squircle bg-base-content bg-opacity-[0.01]'>
              <Image
                src={
                  user && user.avatar
                    ? user.avatar
                    : '/assets/images/profile-placeholder.png'
                }
                alt={`Alvacus, ${user ? user.username : '[deleted user]'}`}
                width={45}
                height={45}
                className='mask mask-squircle object-cover h-[45px] w-[45px]'
                placeholder='blur'
                blurDataURL={
                  user.avatar
                    ? blurredUrl
                    : '/assets/images/profile-placeholder.png'
                }
              />
            </div>

            <div>
              <div className='pl-1.5'>
                <Link
                  href={`${user ? `/profile/${user._id}` : ''}`}
                  className={`smallestMobile:text-[14px] ${
                    !user
                      ? 'disabled pointer-events-none text-gray-500'
                      : 'link link-hover'
                  }`}
                >
                  @{user ? user.username : '[deleted user]'}
                </Link>
                <span className='text-xs text-gray-500 pl-1'>
                  · {controlledDate}
                </span>
              </div>
              <div className='pl-1.5 '>
                {user && (
                  <p className='text-xs text-gray-500'>
                    {user.profession &&
                      (user.company
                        ? `${user.profession} at ${user.company}`
                        : user.profession)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            {authorizedUser.userId !== user._id && !isLoading && (
              <DeleteUser userId={user._id} />
            )}
          </div>
        </div>
        <Link
          href={`${user ? `/profile/${user._id}` : ''}`}
          className=' lgMax:px-1.5 px-3 '
        >
          <div className='flex items-center'>
            <h2 className='card-title line-clamp-1 smallestMobile:text-[16px]'>
              {user ? user.username : '[deleted user]'}
            </h2>
          </div>
          <div className='pb-3 pt-1.5'>
            <p>
              <span className='underline'>email</span>:{' '}
              {user ? user.email : '[deleted user]'}
            </p>
            <p>
              <span className='underline'>role</span>:{' '}
              {user ? user.role : '[deleted user]'}
            </p>
            <p>
              <span className='underline'>last ip</span>:{' '}
              {user ? user.userIp : '[deleted user]'}
            </p>
            {/* <p className='line-clamp-2 text-sm text-base-content/80  smallestMobile:text-[13px] min-h-[40px]'>
                
            </p> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCardDashboard;
