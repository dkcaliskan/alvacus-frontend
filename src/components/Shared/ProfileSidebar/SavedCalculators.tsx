'use client';

// Api & Core imports
import { FunctionComponent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Icons & Ui
import { BsFillBookmarkFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

// Components
import Loader from '../UiElements/Loader';

// Hooks
import useSavedCalcs from '@/hooks/calculators/useSavedCalcs';
import useAllCalcs from '@/hooks/calculators/useAllCalcs';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import type { CalculatorTypes } from '@/types/calculators.d';
type SavedCalculatorsTypes = {
  userId: string;
  setIsProfileDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SavedCalculators: FunctionComponent<SavedCalculatorsTypes> = ({
  userId,
  setIsProfileDrawerOpen = () => false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Create new URLSearchParams object
  const updateParams = new URLSearchParams(params.toString());

  // Get tag, page and sortType from url
  const tag = params.get('tag') || 'all';
  const page = params.get('page') || '1';
  const sortType = params.get('sort') || 'popular';
  const search = params.get('search') || '';

  const [searchStates, setSearchStates] = useState({
    search: '',
    error: '',
  });

  // This is the search that will be submitted to api
  const [submitSearch, setSubmitSearch] = useState('');

  // Get saved calculators with useSavedCalcs hook
  const { calculatorsData, error, isLoading, isValidating, mutate } =
    useSavedCalcs({
      page: '1',
      sortType: 'popular',
      search: searchStates.search,
      tag: 'all',
      userId,
    });

  // Get all calculators with useAllCalcs hook for save and unSave handler to update all calculators
  const { mutate: mutateAllCalculators } = useAllCalcs({
    page,
    sortType,
    search,
    tag,
  });

  // UnSave handler for saved calculators
  const unSaveHandler = async (calc: CalculatorTypes) => {
    try {
      // POST request to unSave calculator from user
      const response = await usePrivateAxios.post(
        `/api/calculators/${calc._id}/${userId}/unSave`
      );

      // If response is successful, mutate saved calculators and all calculators data to revalidate and update cashed data
      if (response.status === 200) {
        mutate();
        mutateAllCalculators();
      }
    } catch (err) {
      setSearchStates({
        ...searchStates,
        error: 'Something went wrong, please try again later.',
      });
    }
  };

  // Search handler for profile sidebar saved calculators
  const searchHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // If search length is 0, set submitSearch to empty string and return
    if (searchStates.search.length === 0) {
      setSubmitSearch('');

      setSearchStates({
        ...searchStates,
        error: '',
      });

      return;
    }

    // If search length is less than 3, set error message and return
    if (searchStates.search.length < 3) {
      setSearchStates({
        ...searchStates,
        error: 'Minimum search length is 3',
      });
      return;
    }

    // Update submitSearch
    setSubmitSearch(searchStates.search);
  };

  const showAllHandler = () => {
    // Update params
    updateParams.delete('list');
    updateParams.set('list', 'saved');
    updateParams.set('page', '1');

    // Push new params to url
    router.push(`/?${updateParams.toString()}`);

    // Close profile drawer
    setIsProfileDrawerOpen(false);
  };

  if (isLoading || isValidating) {
    return (
      <div className='custom-bg-color rounded-box p-3 h-[267px] max-h-[356px]'>
        <div className='flex items-center mx-auto justify-center'>
          <p>Saved Calculators</p>
          <BsFillBookmarkFill className='ml-1.5 text-warning' />
        </div>
        <div className='h-[135px] max-h-[220px]'>
          <Loader />
        </div>
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className='custom-bg-color rounded-box p-3 h-[267px] max-h-[356px]'>
        <div className='flex items-center mx-auto justify-center'>
          <p>Saved Calculators</p>
          <BsFillBookmarkFill className='ml-1.5 text-warning' />
        </div>
        <div className='h-[135px] max-h-[220px] flex justify-center items-center mt-6'>
          <div>
            <p className='text-sm text-center font-light'>
              An error occurred while fetching your saved calculators 😢
            </p>
            <button
              className='btn btn-primary btn-sm rounded-full px-4  flex items-center mx-auto mt-3'
              aria-label='try again fetch'
              id='try-again'
              onClick={() => {
                mutate();
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='custom-bg-color rounded-box p-3 h-[267px] max-h-[356px]'>
      <div className='flex items-center mx-auto justify-center'>
        <p>Saved Calculators</p>
        <BsFillBookmarkFill className='ml-1.5 text-warning' />
      </div>

      <div>
        {/* Search saved calculators */}
        <form
          className='form-control w-full mt-3 mb-2'
          onSubmit={searchHandler}
        >
          <label className='label  hidden' htmlFor='search-in-saved'>
            <div className=''>
              <span className='label-text line-clamp-1 pl-2 text-xl'>
                Search saved calculators
              </span>
            </div>
          </label>
          <div className='relative z-0'>
            <input
              id='search-in-saved'
              name='search-in-saved'
              type='text'
              placeholder='Search in saved calculators...'
              className={`input input-sm w-full bg-base-100 focus:outline-offset-0 ${
                searchStates.error && 'input-error'
              } `}
              onChange={(e) => {
                setSearchStates({
                  ...searchStates,
                  search: e.target.value,
                });
              }}
              disabled={
                calculatorsData && calculatorsData.count <= 3 && !submitSearch
                  ? true
                  : false
              }
              value={searchStates.search}
              autoComplete='off'
            />
            {searchStates.search.length >= 1 && (
              <button
                type='button'
                onClick={() => {
                  setSearchStates({
                    search: '',
                    error: '',
                  });
                }}
                className='absolute top-[3px] right-2'
              >
                <IoCloseSharp className='text-gray-500 ' size={27} />
              </button>
            )}
            {searchStates.error && (
              <div>
                <div
                  className='absolute top-[6.5px] right-9 tooltip tooltip-left lg:tooltip-bottom'
                  id='error-message'
                  data-tip={searchStates.error}
                >
                  <AiOutlineQuestionCircle className='text-error' size={20} />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Saved calculators listing */}
        {calculatorsData && calculatorsData.count >= 1 ? (
          <div>
            <div className='h-[135px] max-h-[220px]'>
              {calculatorsData.calculators.map(
                (calc: CalculatorTypes, index: number) => (
                  <div key={index} className='flex items-center py-1.5'>
                    <button
                      className='btn btn-sm btn-ghost'
                      onClick={() => {
                        unSaveHandler(calc);
                      }}
                    >
                      <BsFillBookmarkFill className=' text-warning' />
                    </button>
                    <Link
                      href={`/${calc.type}/${
                        calc.type === 'modular' ? calc._id : calc.slug
                      }`}
                      className='line-clamp-1 w-full rounded-lg btn-ghost transition ease-in-out duration-200 text-left pl-1.5 pt-1 pb-0.5'
                    >
                      {calc.title}
                    </Link>
                  </div>
                )
              )}
            </div>

            {calculatorsData.count > 3 && (
              <button
                className='btn btn-primary w-full btn-sm rounded-box'
                type='button'
                onClick={() => showAllHandler()}
              >
                Show all
              </button>
            )}
          </div>
        ) : (
          /* If no saved calculators found */
          <div className='mt-[60px]'>
            <p className='text-sm text-center font-light'>
              No saved calculator found 😥
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCalculators;
