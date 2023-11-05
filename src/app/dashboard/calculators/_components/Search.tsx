'use client';

// API & Core
import React, { FunctionComponent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// UI & Icons
import { BsSearch } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

// Constants
import { SEARCH_ICON } from '@/constants/ImageConstants';

// Hooks
import useAllCalcs from '@/hooks/calculators/useAllCalcs';

const SearchCalcsDashboard: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // get queries from url
  const searchQuery = params.get('search');
  const tag = params.get('tag');
  const page = params.get('page');
  const sortType = params.get('sort');
  const list = params.get('list');

  // Get the calculators data for showing the count in the placeholder
  const { calculatorsData } = useAllCalcs({
    page: page || '1',
    sortType: sortType || 'recent',
    search: searchQuery || '',
    tag: tag || 'all',
  });

  // Set the search query from the query params or default to empty string
  const [search, setSearch] = useState<string>(searchQuery || '');

  // Set the input error state
  const [inputError, setInputError] = useState(false);

  const searchHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    if (search) {
      // Update the search query
      updateParams.set('search', search);

      // Update the page query to 1 to reset the pagination
      updateParams.set('page', '1');

      // push the new url with the updated params
      router.push(pathname + '?' + updateParams.toString());
    } else {
      setInputError(true);
    }
  };

  const clearSearch = () => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update the search query
    updateParams.delete('search');

    // Update the page query to 1 to reset the pagination
    updateParams.set('page', '1');

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());

    setSearch('');
    setInputError(false);
  };

  return (
    <div>
      <form
        className='form-control w-full mt-1 pb-6 lgMax:px-1.5'
        onSubmit={searchHandler}
      >
        <label className='label' htmlFor='search'>
          <div className='flex items-center'>
            <Image
              src={SEARCH_ICON}
              width='22'
              height='22'
              alt='Alvacus, search'
              title='Alvacus, search'
            />
            <span className='label-text line-clamp-1 pl-2 text-xl'>
              {tag === 'all' || !tag
                ? 'Search'
                : `Search in ${
                    (tag as string).charAt(0).toUpperCase() + tag.slice(1)
                  }`}
            </span>
          </div>
        </label>
        <div className='lg:pt-1 max-h-[43px]  rounded-full relative'>
          <input
            id='search'
            type='text'
            name='search'
            className={`input w-full custom-bg-color rounded-full pl-6 max-h-[43px] focus:outline-offset-0 ${
              inputError && 'input-error'
            }`}
            placeholder={`Search in ${
              list === 'my'
                ? 'my'
                : list === 'saved'
                ? 'saved'
                : (list === 'all' || list === null) && calculatorsData
                ? calculatorsData.count
                : ''
            } calculators...`}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoComplete='off'
          />
          {search.length >= 1 ? (
            <button
              type='button'
              aria-label='Clear search'
              onClick={() => clearSearch()}
              className='absolute top-[7px] lg:top-[11px] right-[57px]'
            >
              <IoCloseSharp className='text-gray-500' size={29} />
            </button>
          ) : (
            ''
          )}

          <button
            type='submit'
            aria-label='Search calculator'
            className='absolute right-[20px] top-[12px] lg:top-[16px]'
          >
            <BsSearch size={20} className='text-gray-500 ' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchCalcsDashboard;
