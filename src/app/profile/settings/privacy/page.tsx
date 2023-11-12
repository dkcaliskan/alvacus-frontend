// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import PrivacyStates from './_components/PrivacyStates';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Settings',
  alternates: {
    canonical: 'https://alvacus.com/profile/settings/privacy',
  },
};

const Privacy: NextPage = async () => {
  return (
    <section>
      <PrivacyStates />
    </section>
  );
};

export default Privacy;
