'use client';
// API & Core
import React, { FunctionComponent } from 'react';
import { useSearchParams } from 'next/navigation';

// UI & Icons
import { IoRefreshOutline } from 'react-icons/io5';

// Components
import Pagination from '@/components/Shared/Calculator/Pagination';
import CalculatorCardSkeleton from '@/components/Shared/UiElements/Skeletons/CalculatorCardSkeleton';
import ContactCardDashboard from '../ContactCard';

// Contexts, Hooks
import useContacts from '@/hooks/dashboard-get/contacts/useContacts';

// Types
import type { ContactTypes } from '@/types/contact.d';

const SeenContacts: FunctionComponent = () => {
  const params = useSearchParams();

  const search = params.get('search') || '';
  const page = params.get('page');

  // Get the contacts data
  const { contactsData, isLoading, error, mutate } = useContacts({
    page: page || '1',
    sortType: 'recent',
    search: search || '',
  });

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-1'>
        <CalculatorCardSkeleton />
        <CalculatorCardSkeleton />
        <CalculatorCardSkeleton />
      </div>
    );
  }

  // If error occurs while fetching data return refresh button
  if ((error || !contactsData) && !isLoading) {
    return (
      <div className=''>
        <div className='text-center mx-auto mt-3 min-h-[150px] max-h-[150px]  justify-center'>
          <p>Oops, Something went wrong. Please try again.</p>
          <button
            type='button'
            className='btn btn-primary rounded-full px-6 flex items-center mx-auto mt-3'
            onClick={() => mutate()}
          >
            <IoRefreshOutline size={23} className='mr-1.5' />
            Try again
          </button>
        </div>
      </div>
    );
  }

  // If no calculators found return create calculator button
  if (contactsData && contactsData.count === 0 && !isLoading) {
    return (
      <div className=''>
        <div className='text-center mx-auto mt-3 min-h-[150px] max-h-[150px] justify-center'>
          <p>There are no contacts at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={``}>
      <div className='grid grid-cols-1 gap-6 pb-3 lg:pb-5 mt-3'>
        {contactsData.contacts.map((contact: ContactTypes) => (
          <div key={contact._id} className=''>
            <ContactCardDashboard contact={contact} />
          </div>
        ))}
      </div>
      {contactsData.count >= 4 && (
        <div>
          <Pagination
            totalPages={contactsData.totalPages}
            currentPage={contactsData.currentPage}
            count={contactsData.count}
          />
        </div>
      )}
    </div>
  );
};

export default SeenContacts;
