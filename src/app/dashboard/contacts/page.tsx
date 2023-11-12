// Api & Core imports
import React from 'react';

// Components
import ContactsSecurePage from './_components/SecurePage';

// Metadata
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contacts',
  alternates: {
    canonical: 'https://alvacus.com/dashboard/contacts',
  },
};

const DashboardContacts = () => {
  return <ContactsSecurePage />;
};

export default DashboardContacts;
