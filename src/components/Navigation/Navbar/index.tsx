// Api & Core imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import GoBack from './GoBack';
import ThemeChanger from './ThemeChanger';
import NavSearch from './NavSearch';
import TagsDrawer from './Drawers/TagsDrawer';
import ProfileDrawer from './Drawers/ProfileDrawer';

// Constants
import { LOGO_ICON } from '@/constants/ImageConstants';

const Navbar = () => {
  return (
    <header className='bg-base-100 border-b border-slate-400/10'>
      <div className={`navbar container mx-auto  lgMax:px-0 lg:pr-3`}>
        <div>
          <TagsDrawer />
        </div>
        <div className={``}>
          <GoBack />
        </div>
        <div className={`flex-1`}>
          <Link
            href='/'
            as={'/'}
            className='flex items-center btn btn-ghost normal-case text-xl pl-0 '
          >
            <Image
              src={LOGO_ICON}
              className='smallestMobile:hidden'
              width='45'
              height='45'
              alt='logo'
              title='Alvacus, logo'
              placeholder='blur'
              blurDataURL={LOGO_ICON}
            />

            <span className='drop-shadow-lg text-xl logo-text'>Alvacus</span>
          </Link>
        </div>
        <div className='flex-none'>
          <NavSearch />
          <ThemeChanger />
          <ProfileDrawer />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
