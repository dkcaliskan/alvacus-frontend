'use client';

// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Icons & Ui
import { BiError } from 'react-icons/bi';

// Hooks
import useAllCalcs from '@/hooks/calculators/useAllCalcs';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import useUnverifiedCalcs from '@/hooks/calculators/useUnverifiedCalcs';

// Types
import type { AxiosError } from 'axios';
type CalcStatusTypes = {
  calculatorId: string;
  isVerified: boolean;
};
interface ErrorResponse {
  message: string;
}

const CalcStatus: FunctionComponent<CalcStatusTypes> = ({
  calculatorId,
  isVerified,
}) => {
  const params = useSearchParams();

  const page = params.get('page') || 1;
  const sortType = params.get('sort') || 'recent';
  const search = params.get('search') || '';
  const tag = params.get('tag') || '';

  const { mutate } = useAllCalcs({
    page,
    sortType,
    search,
    tag,
  });
  const { mutate: unverifiedCalcsMutate } = useUnverifiedCalcs({
    page,
    sortType,
    search,
    tag,
  });

  const [status, setStatus] = useState(isVerified || false);
  const [error, setError] = useState<boolean | string>(false);

  // Status Handler
  const statusHandler = async () => {
    setStatus(!status);

    try {
      const res = await usePrivateAxios.patch(
        `/api/calculators/verify/${calculatorId}`,
        {
          isVerified: !status,
        }
      );
      if (res.status === 200) {
        mutate();
        unverifiedCalcsMutate();
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
            className={`${
              status
                ? 'btn btn-sm btn-outline btn-success  '
                : 'btn btn-sm btn-outline btn-ghost'
            }`}
            onClick={() => {
              statusHandler();
            }}
          >
            {status ? 'Verified' : 'Verify'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CalcStatus;
