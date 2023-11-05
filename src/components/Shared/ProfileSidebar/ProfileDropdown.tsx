'use client';

// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';

// Icons & Ui
import { BiChevronDown, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';

// Hooks
import useUser from '@/hooks/auth/useUser';
import useWindowWidth from '@/hooks/useWindowWidth';

// Types
type ProfileDropdownTypes = {
  username: string;
  logout: () => void;
};

const ProfileDropdown: FunctionComponent<ProfileDropdownTypes> = ({
  username,
  logout,
}) => {
  const { user } = useUser();

  // Check screen width
  const windowWidth = useWindowWidth();

  // Dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownAnimation, setDropdownAnimation] = useState(
    'profile-dropdown-open'
  );

  const dropdownHandler = async (ms: number) => {
    // If dropdown is open, close it
    if (isDropdownOpen) {
      setDropdownAnimation('profile-dropdown-close');

      await new Promise((resolve) => setTimeout(resolve, ms));

      setIsDropdownOpen(false);
    }
    // If dropdown is closed, open it
    else {
      setDropdownAnimation('profile-dropdown-open');

      setIsDropdownOpen(true);
    }
  };

  return (
    <div className='text-center mt-3 w-full mx-auto'>
      <div>
        <button
          id='open-profile-nav'
          name='open-profile-nav'
          type='button'
          onClick={() => dropdownHandler(200)}
          className='flex items-center mx-auto pl-5 '
        >
          <p>{`@${username}`}</p>
          <div>
            {isDropdownOpen ? (
              <BiChevronLeft className='text-primary' size={24} />
            ) : (
              <BiChevronDown className='text-primary' size={24} />
            )}
          </div>
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className={`mt-1.5 bg-base-100 rounded-lg Alvacus-profile-dropdown ${dropdownAnimation}`}
        >
          <div className=''>
            <Link
              href={`/profile/${user?.userId}`}
              className='flex items-center justify-between btn-ghost px-1.5 rounded-t-lg py-1.5'
            >
              <div className='flex items-center'>
                <FaUser className='mr-2' size={17} />
                Your Profile
              </div>
              <BiChevronRight className='' size={24} />
            </Link>
          </div>

          <div className='mt-1.5'>
            <Link
              href={
                windowWidth! >= 1024
                  ? '/profile/settings/account'
                  : '/profile/settings'
              }
              className='flex items-center justify-between btn-ghost px-1.5 py-1.5'
            >
              <div className='flex items-center'>
                <IoSettingsOutline className='mr-2 ' size={19} />
                Settings
              </div>
              <BiChevronRight className='' size={24} />
            </Link>
          </div>
          <div className='mt-1.5'>
            <button
              className='flex items-center justify-between btn-ghost px-1.5 py-1.5 rounded-b-lg w-full'
              onClick={logout}
            >
              <div className='flex items-center'>
                <IoIosLogOut className='mr-2  text-error' size={22} />
                Logout
              </div>
              <BiChevronRight className='' size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
