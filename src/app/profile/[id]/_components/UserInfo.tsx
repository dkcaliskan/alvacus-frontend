'use client';
// Api & Core imports
import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import UserBadge from '@/components/Shared/UserBadge';

// Icons & Ui
import { IoSettingsOutline } from 'react-icons/io5';

// Hooks
import useUser from '@/hooks/auth/useUser';
import useMyCalcs from '@/hooks/calculators/useMyCalcs';
import useWindowWidth from '@/hooks/useWindowWidth';

// Types
import type { UserTypes } from '@/types/user.d';

type UserInfoTypes = {
  user: UserTypes;
};

const UserInfo: FunctionComponent<UserInfoTypes> = ({ user }) => {
  const { user: loggedInUser } = useUser();

  const { calculatorsData } = useMyCalcs({
    page: '1',
    sortType: 'recent',
    search: '',
    tag: 'all',
    userId: user._id,
  });
  const windowWidth = useWindowWidth();

  // Get the interaction count
  const savedUserCount = user.calculatorsSavedByUsers?.length || 0;
  const likedCommentsCount = user.likedCommentsByUsers?.length || 0;
  const interactionCount = savedUserCount + likedCommentsCount;

  return (
    <div className='lg:mt-[55px]'>
      <div className='custom-bg-color p-3 py-[18px] lgMax:mb-6 lg:rounded-box'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='mask mask-squircle bg-base-content bg-opacity-[0.01] p-px'>
              <Image
                src={
                  user.avatar
                    ? user.avatar
                    : '/assets/images/profile-placeholder.png'
                }
                width={120}
                height={120}
                className='mask mask-squircle object-contain smallestMobile:h-[75px] smallestMobile:w-[75px] lg:h-[120px] lg:w-[120px] h-[100px] w-[100px] '
                alt={`${user.username} Alvacus profile picture`}
                placeholder='blur'
                blurDataURL={`${user.avatar}`}
              />
            </div>
            <div className='pl-3'>
              <div className='flex '>
                <div>
                  <h1 className='text-sm xxsm:text-xl font-bold'>
                    {user.username}
                  </h1>
                </div>
              </div>
              <div className=''>
                <p className='text-xs text-gray-500 line-clamp-1'>
                  {user.profession && user.company
                    ? `${user.profession} at ${user.company}`
                    : user.profession && !user.company
                    ? user.profession
                    : ''}
                </p>
              </div>
              <div className='flex'>
                <div className='border-r-[1px] create-border-color w-[70px] -ml-[8px] mt-3 text-xs '>
                  <p className='text-center'>Created </p>
                  <p className='text-center'>
                    {calculatorsData ? calculatorsData.count : 0}
                  </p>
                </div>
                <div className=' create-border-color w-[90px] mt-3 text-xs '>
                  <p className='text-center'>Interactions</p>
                  <p className='text-center'>{interactionCount}</p>
                </div>
              </div>
              {/* <div className="mt-3">
            <button
              type="button"
              className="btn btn-outline btn-ghost btn-xs"
            >
              Send Message
            </button>
          </div> */}
            </div>
          </div>
          <div className='mt-3'>
            <div className='flex items-center'>
              {loggedInUser && loggedInUser.userId === user._id && (
                <Link
                  href={
                    windowWidth! >= 1024
                      ? '/profile/settings/account'
                      : '/profile/settings'
                  }
                  className='btn-ghost px-1.5 py-1.5 rounded-lg mr-2'
                >
                  <IoSettingsOutline className='' size={19} />
                </Link>
              )}
              <UserBadge
                rank={Number(calculatorsData ? calculatorsData.count : 0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
