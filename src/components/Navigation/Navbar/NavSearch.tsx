'use client';

// API & Core
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// UI & Icons
import { BsSearch, BsXLg } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

const NavSearch = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle search input
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (search) {
      router.push(`/?search=${search}`);
    }
  };

  // Search open button
  const searchOpenButton = () => {
    return (
      <div>
        {isSearchOpen ? (
          <button
            type='button'
            className='btn btn-ghost'
            id='search-close'
            aria-label='Close search'
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <BsXLg size={20} />
          </button>
        ) : (
          <button
            type='button'
            id='search-open'
            aria-label='Open search'
            className='btn btn-ghost'
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <BsSearch size={20} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      {pathname !== '/' && (
        <div>
          {/* Mobile navigation search bar */}
          <div className=' lg:hidden'>
            {searchOpenButton()}
            {isSearchOpen && (
              <div className='flex items-center lg:hidden absolute left-0 right-0 top-[65px] custom-bg-color p-1.5 z-10'>
                <form
                  className='mx-1.5 form-control w-full min-w-max'
                  onSubmit={handleSubmit}
                >
                  <div className='lg:pt-1 max-h-[48px] rounded-lg relative w-full'>
                    <input
                      id='nav-search'
                      type='text'
                      name='nav-search'
                      placeholder='Search in calculators...'
                      className={`input w-full  rounded-lg pl-6 max-h-[48px] focus:outline-offset-0 `}
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      autoComplete='off'
                    />
                    {search.length >= 1 && (
                      <button
                        type='button'
                        onClick={() => setSearch('')}
                        id='search-clear'
                        aria-label='Clear search'
                        className='absolute top-[8px] right-[57px]'
                      >
                        <IoCloseSharp className='text-gray-500' size={32} />
                      </button>
                    )}

                    <button
                      type='submit'
                      id='search-submit'
                      aria-label='Submit search'
                      className='absolute right-[20px] top-[14px] '
                    >
                      <BsSearch size={20} className='text-gray-500 ' />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Desktop navigation search bar */}
          <div className='flex items-center lgMax:hidden'>
            <form
              className='mx-1.5 form-control w-full min-w-[300px]'
              onSubmit={handleSubmit}
            >
              <div className=' max-h-[48px] rounded-lg relative w-full'>
                <input
                  id='nav-search'
                  type='text'
                  name='nav-search'
                  placeholder='Search in calculators...'
                  className={`input w-full custom-bg-color rounded-lg pl-6 max-h-[48px] focus:outline-offset-0 `}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  autoComplete='off'
                />
                {search.length >= 1 && (
                  <button
                    type='button'
                    onClick={() => setSearch('')}
                    className='absolute top-[9px] right-[45px]'
                  >
                    <IoCloseSharp className='text-gray-500' size={32} />
                  </button>
                )}

                <button
                  type='submit'
                  className='absolute right-[15px] top-[15px] pointer-events-none'
                >
                  <BsSearch size={20} className=' ' />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSearch;
