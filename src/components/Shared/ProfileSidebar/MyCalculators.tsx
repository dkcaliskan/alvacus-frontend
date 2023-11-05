'use client';

// Api & Core imports
import { FunctionComponent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Icons & Ui
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { ImCalculator } from 'react-icons/im';
import { IoMdCalculator } from 'react-icons/io';

// Components
import Loader from '../UiElements/Loader';

// Hooks
import useMyCalcs from '@/hooks/calculators/useMyCalcs';
import EditLink from '../Calculator/EditLink';

// Types
import type { CalculatorTypes } from '@/types/calculators.d';
type MyCalculatorsTypes = {
  userId: string;
  setIsProfileDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyCalculators: FunctionComponent<MyCalculatorsTypes> = ({
  userId,
  setIsProfileDrawerOpen = () => false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Create new URLSearchParams object
  const updateParams = new URLSearchParams(params.toString());

  const [searchStates, setSearchStates] = useState({
    value: '',
    error: '',
  });

  // This is the search that will be submitted to api
  const [submitSearch, setSubmitSearch] = useState('');

  // Get calculators that user created
  const { calculatorsData, error, isLoading, isValidating, mutate } =
    useMyCalcs({
      page: '1',
      sortType: 'recent',
      search: submitSearch,
      tag: 'all',
      userId,
    });

  const searchHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // If search length is 0, set submitSearch to empty string and return
    if (searchStates.value.length === 0) {
      setSubmitSearch('');

      setSearchStates({
        ...searchStates,
        error: '',
      });

      return;
    }

    // If search length is less than 3, set error message and return
    if (searchStates.value.length < 3) {
      setSearchStates({
        ...searchStates,
        error: 'Minimum search length is 3',
      });
      return;
    }

    // Update submitSearch
    setSubmitSearch(searchStates.value);
  };

  const showAllHandler = () => {
    // Update params
    updateParams.delete('tag');
    updateParams.set('tag', 'all');
    updateParams.set('list', 'my');
    updateParams.set('page', '1');

    // Push new params to url
    router.push(`/?${updateParams.toString()}`);

    // Close profile drawer
    setIsProfileDrawerOpen(false);
  };

  // If loading or validating, show loader
  if (isLoading || isValidating) {
    return (
      <div className='custom-bg-color rounded-box p-3 h-[267px] max-h-[356px]'>
        <div className='flex items-center mx-auto justify-center'>
          <p>My Calculators</p>
          <IoMdCalculator className='ml-1.5 text-[#3b82f6]' />
        </div>
        <div className='h-[135px] max-h-[220px] '>
          <Loader />
        </div>
      </div>
    );
  }

  // If not loading and error, show error message
  if (!isLoading && error) {
    return (
      <div className='custom-bg-color rounded-box p-3 h-[267px] max-h-[356px]'>
        <div className='flex items-center mx-auto justify-center'>
          <p>My Calculators</p>
          <IoMdCalculator className='ml-1.5 text-[#3b82f6]' />
        </div>
        <div className='h-[135px] max-h-[220px] flex justify-center items-center mt-6'>
          <div>
            <p className='text-sm text-center font-light'>
              An error occurred while fetching your calculators 😢
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
        <p>My Calculators</p>
        <ImCalculator className='ml-1.5 text-[#3b82f6]' />
      </div>

      <div>
        {/* Search calculators that user created */}
        <form
          className='form-control w-full mt-3 mb-2'
          onSubmit={searchHandler}
        >
          <label className='label  hidden' htmlFor='search-my-calculators'>
            <div className=''>
              <span className='label-text line-clamp-1 pl-2 text-xl'>
                Search my calculators
              </span>
            </div>
          </label>
          <div className='relative z-0'>
            <input
              id='search-my-calculators'
              name='search-my-calculators'
              type='text'
              placeholder='Search in my calculators...'
              className={`input input-sm w-full bg-base-100 focus:outline-offset-0 z-0 ${
                searchStates.error && 'input-error'
              }`}
              onChange={(e) => {
                setSearchStates({
                  value: e.target.value,
                  error: '',
                });
              }}
              disabled={
                calculatorsData && calculatorsData.count <= 3 && !submitSearch
                  ? true
                  : false
              }
              value={searchStates.value}
              autoComplete='off'
            />

            {searchStates.value.length >= 1 && (
              <button
                type='button'
                onClick={() => {
                  setSearchStates({
                    value: '',
                    error: '',
                  });
                  setSubmitSearch('');
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
                  data-tip='Minimum search length is 3'
                >
                  <AiOutlineQuestionCircle className='text-error' size={20} />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* List calculators that user created */}
        {calculatorsData && calculatorsData.count >= 1 ? (
          <div>
            <div className='h-[135px] max-h-[220px]'>
              {calculatorsData.calculators.map(
                (calc: CalculatorTypes, index: number) => (
                  <div key={index} className='flex items-center py-1.5'>
                    <EditLink
                      calcType={calc.type}
                      calcId={calc._id}
                      customStyle='btn btn-sm btn-ghost'
                      size={13}
                      tooltipDisable={true}
                    />
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
            <div className='mt-1'>
              {calculatorsData && calculatorsData.count > 3 && (
                <button
                  type='button'
                  className='btn btn-primary w-full btn-sm rounded-box'
                  onClick={() => {
                    showAllHandler();
                    setIsProfileDrawerOpen(false);
                  }}
                >
                  Show all
                </button>
              )}
            </div>
          </div>
        ) : (
          /* If no created calculators found */
          <div className='mt-[60px]'>
            <p className='text-sm text-center font-light'>
              Would you like to create one? 😊
            </p>
            <Link
              href={'/create'}
              className='btn btn-primary btn-sm rounded-full px-4  flex items-center mx-auto mt-3 w-max'
            >
              Create a calculator
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalculators;
