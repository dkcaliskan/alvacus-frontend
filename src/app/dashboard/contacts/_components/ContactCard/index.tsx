'use client';

// API & Core
import React, { FunctionComponent } from 'react';

// Components
import ContactStatus from './ContactStatus';

// Contexts, Hooks
import useRelativeTime from '@/hooks/useRelativeTime';

// Types
import type { ContactCardTypes } from '@/types/contact.d';

const ContactCardDashboard: FunctionComponent<ContactCardTypes> = ({
  contact,
}) => {
  const controlledDate = useRelativeTime(contact.createdAt);

  return (
    <div className='rounded-box custom-bg-color hover:shadow-lg hover:opacity-[0.88] transition ease-in-out duration-200  lgMax:rounded-md min-h-[180px] z-10'>
      <div className='card-body px-0 py-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center px-3 pt-[8.5px]'>
            <p className=''>
              Contact Date = {contact.createdAt.toString()} · {controlledDate}
            </p>
          </div>
          <div className='flex items-center'>
            <ContactStatus
              contactId={contact._id}
              contactStatus={contact.isContactSeen}
            />
          </div>
        </div>
        <div className=' lgMax:px-1.5 px-3 '>
          <div className='pb-3 pt-1.5 prose max-w-none break-words'>
            <p>
              <span className='underline font-bold'>Username</span>:{' '}
              {contact.username ? contact.username : '[Anonymous]'}
            </p>
            <p>
              <span className='underline font-bold'>Email</span>:{' '}
              {contact.email ? contact.email : '[Anonymous]'}
            </p>
            {contact.subject && (
              <p>
                <span className='underline font-bold'>Subject</span>:{' '}
                {contact.subject ? contact.subject : '[No Subject]'}
              </p>
            )}
            {contact.message && (
              <p>
                <span className='underline font-bold break-words '>
                  Message
                </span>
                : {contact.message ? contact.message : '[No Message]'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCardDashboard;
