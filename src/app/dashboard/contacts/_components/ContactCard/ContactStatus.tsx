'use client';

// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Icons & Ui
import { BiError } from 'react-icons/bi';

// Hooks
import useContacts from '@/hooks/dashboard-get/contacts/useContacts';
import useUnseenContacts from '@/hooks/dashboard-get/contacts/useUnseenContacts';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import type { AxiosError } from 'axios';
type ContactStatusTypes = {
  contactId: string;
  contactStatus: boolean;
};
interface ErrorResponse {
  message: string;
}

const ContactStatus: FunctionComponent<ContactStatusTypes> = ({
  contactId,
  contactStatus,
}) => {
  const params = useSearchParams();

  const page = params.get('page') || 1;
  const sortType = params.get('sort') || 'recent';
  const search = params.get('search') || '';
  const tag = params.get('tag') || '';

  const { mutate } = useContacts({
    page,
    sortType,
    search,
    tag,
  });

  const { mutate: unseenContactsMutate } = useUnseenContacts({
    page,
    sortType,
    search,
    tag,
  });

  const [status, setStatus] = useState(contactStatus || false);
  const [error, setError] = useState<boolean | string>(false);

  // Status Handler
  const statusHandler = async () => {
    setStatus(!status);
    try {
      const res = await usePrivateAxios.patch(
        `/api/contact/update/${contactId}`,
        {
          isContactSeen: !status,
        }
      );
      if (res.status === 200) {
        mutate();
        unseenContactsMutate();
      }
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;

      setStatus(false);
      if (!error.response) {
        setError('Something went wrong. Please try again.');
      } else {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {error ? (
        <div className='tooltip tooltip-left mt-2 mr-3' data-tip={error}>
          <BiError className='text-red-500' size={26} />
        </div>
      ) : (
        <div className='flex items-center extraSmallMobile:pl-1 sm:gap-1'>
          <button
            type='button'
            className={`rounded-box rounded-br-none rounded-tl-none ${
              status
                ? 'btn btn-sm btn-outline btn-success  '
                : 'btn btn-sm btn-outline btn-ghost'
            }`}
            onClick={() => {
              statusHandler();
            }}
          >
            {status ? 'Seen' : 'Unseen'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactStatus;
