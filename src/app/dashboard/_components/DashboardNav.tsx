'use client';
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// UI & Icons
import { BiChevronRight } from 'react-icons/bi';

// Constants
import { LOGO_ICON } from '@/constants/ImageConstants';

const DashboardNav: FunctionComponent = () => {
  const activePage = usePathname().split('/dashboard/')[1] || '';

  return (
    <div className={`${usePathname() !== '/dashboard' && 'lgMax:hidden'}`}>
      <div className='flex items-center mb-1.5 lgMax:px-3 py-6 border-b-[1px] create-border-color'>
        <Image
          src={LOGO_ICON}
          width={35}
          height={35}
          alt='logo'
          title='Alvacus, logo'
        />
        <h1 className='text-xl ml-3'>Dashboard</h1>
      </div>

      <div className='mt-6'>
        <div className='mt-3 flex items-center'>
          {activePage === 'metrics' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/dashboard/metrics`}
            as={`/dashboard/metrics`}
            className={`${
              activePage === 'metrics'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Metrics</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>
        <div className='mt-3 flex items-center'>
          {activePage === 'calculators' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/dashboard/calculators`}
            as={`/dashboard/calculators`}
            className={`${
              activePage === 'calculators'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Calculators</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>
        <div className='mt-3 flex items-center'>
          {activePage === 'users' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/dashboard/users`}
            as={`/dashboard/users`}
            className={`${
              activePage === 'users'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Users</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>

        <div className='mt-3 flex items-center'>
          {activePage === 'reports' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/dashboard/reports`}
            as={`/dashboard/reports`}
            className={`${
              activePage === 'reports'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Reports</span>
            </div>
            <div>
              <BiChevronRight className='' size={24} />
            </div>
          </Link>
        </div>
        <div className='mt-3 flex items-center'>
          {activePage === 'contact' && (
            <div className='h-[40px] w-[5px] rounded-lg bg-primary mr-1.5'></div>
          )}
          <Link
            href={`/dashboard/contacts`}
            as={`/dashboard/contacts`}
            className={`${
              activePage === 'contacts'
                ? 'custom-bg-color cursor-default rounded-lg pointer-events-none'
                : 'btn-ghost lg:rounded-lg '
            } text-xl flex items-center justify-between py-3 px-3 w-full`}
          >
            <div className='flex items-center'>
              <span className=''>Contacts</span>
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

export default DashboardNav;
