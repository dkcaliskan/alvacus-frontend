'use client';

// API & Core
import React, { useState, FunctionComponent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// UI & Icons
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// Types
type PaginationTypes = {
  totalPages: number;
  currentPage: number;
  count: number;
};

const Pagination: FunctionComponent<PaginationTypes> = ({
  totalPages,
  currentPage,
  count,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Get the page from the query params
  const page = params.get('page');

  // Set the selected page from the query params or default to 1
  const [selectedPage, setSelectedPage] = useState<number>(Number(page) || 1);

  const handleSelectPagination = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update the page query
    updateParams.set('page', event.target.value);

    // push the new url to the state
    setSelectedPage(Number(event.target.value));

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());
  };

  const handleNextPagination = () => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update the page query
    updateParams.set('page', String(Number(currentPage) + 1));

    // update state
    setSelectedPage(Number(currentPage) + 1);

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());

    /*  query.page = ((Number(currentPage) || 1) + 1) as any;
    setSelectedPage(((Number(currentPage) || 1) + 1) as any);
    router.push({
      pathname: path,
      query: query,
    }); */
  };
  const handleFirstPagination = () => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update the page query
    updateParams.set('page', '1');

    // update state
    setSelectedPage(1);

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());

    /*   query.page = '1';
    setSelectedPage(1);
    router.push({
      pathname: path,
      query: query,
    }); */
  };
  const handleLastPagination = () => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update the page query
    updateParams.set('page', String(totalPages));

    // update state
    setSelectedPage(totalPages);

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());

    /* query.page = String(totalPages);
    setSelectedPage(totalPages);
    router.push({
      pathname: path,
      query: query,
    }); */
  };
  const handlePrevPagination = () => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update the page query
    updateParams.set('page', String(Number(currentPage) - 1));

    // update state
    setSelectedPage(Number(currentPage) - 1);

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());

    /*    query.page = ((Number(currentPage) || 1) - 1) as any;
    setSelectedPage(((Number(currentPage) || 1) - 1) as any);
    router.push({
      pathname: path,
      query: query,
    }); */
  };

  const start = (Number(currentPage) - 1) * 3 + 1;
  const end =
    count === start || start + 2 === count || start + 1 === count
      ? count
      : Math.min(Number(currentPage) * 3, totalPages * 3);

  return (
    <div className='h-full'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          {currentPage > 1 && currentPage <= totalPages && (
            <button
              type='button'
              onClick={handleFirstPagination}
              disabled={currentPage <= 1 && true}
              id='go-to-first-page'
              name='go to first page'
              aria-label='go to first page'
              className={`btn btn-ghost max-h-[40px] min-h-[40px]`}
            >
              <AiOutlineLeft />
              <AiOutlineLeft />
            </button>
          )}

          {currentPage > 1 && currentPage <= totalPages && (
            <button
              type='button'
              onClick={handlePrevPagination}
              disabled={currentPage <= 1 && true}
              id='go-to-previous-page'
              name='go to previous page'
              aria-label='go to previous page'
              className={`btn btn-ghost max-h-[40px] min-h-[40px]`}
            >
              <AiOutlineLeft />
            </button>
          )}
        </div>

        <div className='flex items-center'>
          {currentPage < totalPages && (
            <button
              type='button'
              onClick={handleNextPagination}
              disabled={currentPage >= totalPages && true}
              id='go-to-next-page'
              name='go to next page'
              aria-label='go to next page'
              className={`btn btn-ghost max-h-[40px] min-h-[40px]`}
            >
              <AiOutlineRight />
            </button>
          )}

          {currentPage < totalPages && (
            <button
              type='button'
              onClick={handleLastPagination}
              disabled={currentPage >= totalPages && true}
              id='go-to-last-page'
              name='go to last page'
              aria-label='go to last page'
              className={`btn btn-ghost max-h-[40px] min-h-[40px]`}
            >
              <AiOutlineRight className='' />
              <AiOutlineRight className='' />
            </button>
          )}
        </div>
      </div>
      <div className='mt-1.5 px-1.5 lg:px-0 flex items-center justify-between'>
        <div className='form-control w-full max-w-[150px]'>
          <label className='label hidden' htmlFor='page-select'>
            <span className='label-text'>Select the page</span>
          </label>
          <select
            className='select select-bordered golden-select-safe select-sm max-w-[115px] focus:outline-offset-0'
            value={selectedPage}
            onChange={handleSelectPagination}
            id='page-select'
            name='page-select'
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className='text-sm text-gray-500'>
          Results: {start} - {end} of {count}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
