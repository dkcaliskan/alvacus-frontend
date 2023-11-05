// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import PageHolderForMobile from './_components/PageHolder';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings',
};

const ProfileSettings: NextPage = () => {
  return (
    <div className='lgMax:hidden'>
      <PageHolderForMobile />
    </div>
  );
};

export default ProfileSettings;
