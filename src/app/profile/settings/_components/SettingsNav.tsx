'use client';
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// UI & Icons
import { BiChevronRight } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';

// Types

const SettingsNav: FunctionComponent = () => {
  const activePage = usePathname().split('/settings/')[1] || '';
  return (
    <div
      className={`${usePathname() !== '/profile/settings' && 'lgMax:hidden'}`}
    >
      <div className='flex items-center mb-1.5 lgMax:px-3 py-6 border-b-[1px] create-border-color'>
        <h1 className='flex items-center text-xl'>
          <span className='mr-3'>
            <IoSettingsOutline />
          </span>
          Settings
        </h1>
      </div>
      <div className='mt-6'>
        <div className='mt-3 flex items-center'>
          {activePage === 'account' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/profile/settings/account`}
            as={`/profile/settings/account`}
            className={`${
              activePage === 'account'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Your account</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>
        <div className='mt-3 flex items-center'>
          {activePage === 'change-password' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/profile/settings/change-password`}
            as={`/profile/settings/change-password`}
            className={`${
              activePage === 'change-password'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Change password</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>

        <div className='mt-3 flex items-center'>
          {activePage === 'privacy' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/profile/settings/privacy`}
            as={`/profile/settings/privacy`}
            className={`${
              activePage === 'privacy'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Privacy</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>
        <div className='mt-3 flex items-center'>
          {activePage === 'delete-account' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/profile/settings/delete-account`}
            as={`/profile/settings/delete-account`}
            className={`${
              activePage === 'delete-account'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Delete account</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsNav;
