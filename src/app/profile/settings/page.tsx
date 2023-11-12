// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import PageHolderForMobile from './_components/PageHolder';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings',
  alternates: {
    canonical: 'https://alvacus.com/profile/settings',
  },
};

const ProfileSettings: NextPage = () => {
  return (
    <div className='lgMax:hidden'>
      <PageHolderForMobile />
    </div>
  );
};

export default ProfileSettings;
