'use client';

// API & Core
import React, { useState, FunctionComponent, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Components
import Tags from '@/app/_components/Tags';

const TagsDrawer: FunctionComponent = () => {
  const pathname = usePathname();
  const params = useSearchParams();

  const tag = params.get('tag');

  // Tags Drawer State
  const [isTagsDrawerOpen, setIsTagsDrawerOpen] = useState(false);

  // Unset Background Scrolling to use when SideDrawer/Modal if not closed properly
  useEffect(() => {
    document.body.style.overflow = 'unset';
    setIsTagsDrawerOpen(false);

    //! Disabling this eslint rule because preventing the useEffect from running on every render is not necessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag, pathname]);

  const sideDrawerHandler = async () => {
    if (isTagsDrawerOpen) {
      // Unset Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = 'unset';

      setIsTagsDrawerOpen(false);
    } else {
      setIsTagsDrawerOpen(true);

      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <div className='lg:hidden'>
      {pathname === '/' && (
        <div>
          <button
            onClick={() => sideDrawerHandler()}
            aria-label='Toggle Tags Drawer'
            type='button'
            className='btn btn-square btn-ghost lg:hidden'
          >
            <svg
              className='fill-current'
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 512 512'
            >
              <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
            </svg>
          </button>

          {isTagsDrawerOpen && (
            <div>
              <div
                className={`absolute bg-base-100 z-50 h-screen w-full top-0 left-0 overflow-x-auto p-1 pb-16`}
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
                <Tags setIsTagsDrawerOpen={setIsTagsDrawerOpen} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagsDrawer;
