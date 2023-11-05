// Api & Core imports
import React from 'react';
import { NextPage } from 'next';

// Components
import DeleteAccount from './_components/DeleteAccountStates';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Account',
};

const Privacy: NextPage = async () => {
  return (
    <section>
      <DeleteAccount />
    </section>
  );
};

export default Privacy;
