'use client';

// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Icons & Ui
import { BiError } from 'react-icons/bi';

// Hooks
import useReports from '@/hooks/dashboard-get/reports/useReports';
import useUnseenReports from '@/hooks/dashboard-get/reports/useUnseenReports';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import type { AxiosError } from 'axios';
type ReportStatusTypes = {
  reportId: string;
  reportStatus: boolean;
};
interface ErrorResponse {
  message: string;
}

const ReportStatus: FunctionComponent<ReportStatusTypes> = ({
  reportId,
  reportStatus,
}) => {
  const params = useSearchParams();

  const page = params.get('page') || 1;
  const sortType = params.get('sort') || 'recent';
  const search = params.get('search') || '';
  const tag = params.get('tag') || '';

  const { mutate } = useReports({
    page,
    sortType,
    search,
    tag,
  });

  const { mutate: unseenReportsMutate } = useUnseenReports({
    page,
    sortType,
    search,
    tag,
  });

  const [status, setStatus] = useState(reportStatus || false);
  const [error, setError] = useState<boolean | string>(false);

  // Status Handler
  const statusHandler = async () => {
    setStatus(!status);
    try {
      const res = await usePrivateAxios.patch(
        `/api/report/update/${reportId}`,
        {
          isReportSeen: !status,
        }
      );
      if (res.status === 200) {
        mutate();
        unseenReportsMutate();
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

export default ReportStatus;
