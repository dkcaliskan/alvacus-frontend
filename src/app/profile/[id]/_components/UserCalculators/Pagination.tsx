// Api & Core imports
import React, { FunctionComponent } from 'react';

// UI & Icons
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

type UserCalculatorPaginationTypes = {
  totalPages: number;
  currentPage: number;
  count: number;
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
};

const UserCalculatorPagination: FunctionComponent<
  UserCalculatorPaginationTypes
> = ({ totalPages, currentPage, count, selectedPage, setSelectedPage }) => {
  // Handle select pagination
  const handleSelectPagination = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // update state
    setSelectedPage(Number(event.target.value));
  };

  // Handle next pagination
  const handleNextPagination = () => {
    // update state
    setSelectedPage(Number(currentPage) + 1);
  };

  // Handle previous pagination
  const handlePreviousPagination = () => {
    // update state
    setSelectedPage(Number(currentPage) - 1);
  };

  // Handle first pagination
  const handleFirstPagination = () => {
    // update state
    setSelectedPage(1);
  };

  // Handle last pagination
  const handleLastPagination = () => {
    // update state
    setSelectedPage(totalPages);
  };

  // Get the start of the pagination
  const start = (currentPage - 1) * 3 + 1;

  // Get the end of the pagination
  const end =
    count === start || start + 2 === count || start + 1 === count
      ? count
      : Math.min(currentPage * 3, totalPages * 3);

  return (
    <div className='h-full'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <button
            type='button'
            onClick={handleFirstPagination}
            disabled={currentPage <= 1 && true}
            className={`${
              currentPage > 1 && currentPage <= totalPages
                ? 'btn btn-ghost'
                : 'opacity-0'
            } max-h-[40px] min-h-[40px]`}
          >
            <AiOutlineLeft />
            <AiOutlineLeft />
          </button>
          <button
            type='button'
            onClick={handlePreviousPagination}
            disabled={currentPage <= 1 && true}
            className={`${
              currentPage > 1 && currentPage <= totalPages
                ? 'btn btn-ghost'
                : 'opacity-0'
            } max-h-[40px] min-h-[40px]`}
          >
            <AiOutlineLeft />
          </button>
        </div>

        <div className='flex items-center'>
          <button
            type='button'
            onClick={handleNextPagination}
            disabled={currentPage >= totalPages && true}
            className={`${
              currentPage < totalPages ? 'btn btn-ghost' : 'opacity-0'
            } max-h-[40px] min-h-[40px]`}
          >
            <AiOutlineRight />
          </button>
          <button
            type='button'
            onClick={handleLastPagination}
            disabled={currentPage >= totalPages && true}
            className={`${
              currentPage < totalPages ? 'btn btn-ghost' : 'opacity-0'
            } max-h-[40px] min-h-[40px]`}
          >
            <AiOutlineRight className='' />
            <AiOutlineRight className='' />
          </button>
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

export default UserCalculatorPagination;
