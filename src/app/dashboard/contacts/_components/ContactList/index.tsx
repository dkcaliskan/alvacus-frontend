'use client';

// API & Core
import React, { FunctionComponent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// UI & Icons

// Components
import SeenContacts from './SeenContacts';
import UnseenContacts from './UnseenContacts';

// Lazy Components

// Contexts, Hooks
import useUser from '@/hooks/auth/useUser';

const ContactListDashboard: FunctionComponent = () => {
  const router = useRouter();
  const params = useSearchParams();

  const list = params.get('list') || 'all';

  const { user, isValidating, error, isLoading } = useUser();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (
      (!user && !isLoading) ||
      (user && user.role !== 'admin' && !isLoading)
    ) {
      return router.push('/');
    }
  }, [user, isLoading, router]);

  if (list === 'seen') {
    return (
      <div className='min-h-[700px] lgMax:min-h-[200px]'>
        <SeenContacts />
      </div>
    );
  }
  return (
    <div className='min-h-[700px] lgMax:min-h-[200px] mt-3'>
      <UnseenContacts />
    </div>
  );
};

export default ContactListDashboard;
