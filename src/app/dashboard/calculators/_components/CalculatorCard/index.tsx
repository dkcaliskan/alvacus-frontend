'use client';

// API & Core
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// UI & Icons
import { AiFillTag } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';

// Components
import EditLink from '@/components/Shared/Calculator/EditLink';
import CalcStatus from './CalcStatus';

// Contexts, Hooks
import useUser from '@/hooks/auth/useUser';
import useRelativeTime from '@/hooks/useRelativeTime';

// Types
import type { CalculatorCardTypes } from '@/types/calculators.d';

const CalculatorCardDashboard: FunctionComponent<CalculatorCardTypes> = ({
  calculator,
}) => {
  const { user, isLoading } = useUser();

  const controlledDate = useRelativeTime(calculator.createdAt);

  const blurredUrl =
    calculator.author && calculator.author.avatar != undefined
      ? calculator.author.avatar.split('/upload')[0] +
        '/blur:1200' +
        calculator.author.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  return (
    <div className='rounded-box custom-bg-color hover:shadow-lg hover:opacity-[0.88] transition ease-in-out duration-200  lgMax:rounded-md min-h-[180px] max-h-[180px] z-10'>
      <div className='card-body px-0 py-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center lgMax:pl-1.5 pl-3 pt-[8.5px]'>
            <div className='mask mask-squircle bg-base-content h-[45px] w-[45px] bg-opacity-[0.01]'>
              <Image
                src={
                  calculator.author && calculator.author.avatar
                    ? calculator.author.avatar
                    : '/assets/images/profile-placeholder.png'
                }
                alt={`Alvacus, ${
                  calculator.author
                    ? calculator.author.username
                    : '[deleted user]'
                }`}
                width={45}
                height={45}
                className='mask mask-squircle'
                placeholder='blur'
                blurDataURL={
                  calculator.author?.avatar
                    ? blurredUrl
                    : '/assets/images/profile-placeholder.png'
                }
              />
            </div>

            <div>
              <div className='pl-1.5'>
                <Link
                  href={`${
                    calculator.author ? `/profile/${calculator.author._id}` : ''
                  }`}
                  className={`smallestMobile:text-[14px] ${
                    !calculator.author
                      ? 'disabled pointer-events-none text-gray-500'
                      : 'link link-hover'
                  }`}
                >
                  @
                  {calculator.author
                    ? calculator.author.username
                    : '[deleted user]'}
                </Link>
                <span className='text-xs text-gray-500 pl-1'>
                  · {controlledDate}
                </span>
              </div>
              <div className='pl-1.5 '>
                {calculator.author && (
                  <p className='text-xs text-gray-500'>
                    {calculator.author.profession &&
                      (calculator.author.company
                        ? `${calculator.author.profession} at ${calculator.author.company}`
                        : calculator.author.profession)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            {user &&
              !isLoading &&
              calculator.author &&
              (calculator.author._id === user.userId ||
                user.role === 'admin') && (
                <CalcStatus
                  calculatorId={calculator._id}
                  isVerified={calculator.isVerified}
                />
              )}
            {user &&
              !isLoading &&
              calculator.author &&
              (calculator.author._id === user.userId ||
                user.role === 'admin') && (
                <EditLink
                  calcType={calculator.type}
                  calcId={calculator._id}
                  tooltipDisable={true}
                />
              )}
          </div>
        </div>
        <Link
          href={`/${calculator.type}/${
            calculator.type === 'modular' ? calculator._id : calculator.slug
          }`}
          className=' lgMax:px-1.5 px-3 '
        >
          <div className='flex items-center'>
            <h2 className='card-title line-clamp-1 smallestMobile:text-[16px]'>
              {calculator.title.charAt(0).toUpperCase() +
                calculator.title.slice(1)}
            </h2>
          </div>
          <div className='pb-3 pt-1.5'>
            <p className='line-clamp-2 text-sm text-base-content/80  smallestMobile:text-[13px] min-h-[40px]'>
              {calculator.description}
            </p>
          </div>
          <div className='pb-[8.5px] flex items-center'>
            <div className='rounded-lg  flex items-center w-max'>
              <AiFillTag className='text-warning text-md smallestMobile:text-[16px]' />
              <span className='pl-1 text-sm smallestMobile:text-[12px]'>
                {calculator.category.charAt(0).toUpperCase() +
                  calculator.category.slice(1)}
              </span>
            </div>
            <div className='flex items-center'>
              <span className='px-1 text-gray-500'>·</span>
              <div>
                <BsBookmarkFill className='text-warning text-[13px] smallestMobile:text-[11px]' />
              </div>
              <span className='pl-1 text-sm smallestMobile:text-[13px]'>
                {calculator.savedUsers.length}{' '}
                <span className='text-xs text-gray-500 smallestMobile:text-[10px]'>
                  Saves
                </span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CalculatorCardDashboard;
