'use client';

// Api & Core imports
import React, { FunctionComponent, useEffect, useState } from 'react';

// Icons
import { IoCloseSharp } from 'react-icons/io5';
import { BsSearch, BsCheck } from 'react-icons/bs';

// Types
import type { SelectTypes } from '@/types/create-calculator.d';

type SingleSelectTypes = {
  id: string;
  label: string;
  selectionLabel?: string;
  maxHeight?: string;
  forceOpen?: boolean;
  searchId?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  options: SelectTypes[];
  selectedOption: SelectTypes;
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectTypes>>;
};

const SingleSelect: FunctionComponent<SingleSelectTypes> = ({
  id,
  label,
  selectionLabel,
  maxHeight,
  forceOpen,
  searchId,
  searchLabel,
  searchPlaceholder,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen || false);
  const [search, setSearch] = useState('');

  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }

    //! Disabling this eslint rule because preventing the useEffect from running on every render is not necessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <div>
        <label htmlFor={id} className='label'>
          <span className='line-clamp-1 label-text'>{label}</span>
        </label>

        <button
          id={id}
          className={`${
            isOpen && 'rounded-b-none border-b-none'
          } select focus:outline-offset-0 select-bordered w-full pt-[9px]`}
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          aria-label={`Open ${label} `}
          type='button'
        >
          {selectedOption.label ? selectedOption.label : selectionLabel}
        </button>

        {isOpen && (
          <div className='bg-base-100 border-[1px] create-border-color rounded-b-lg pt-2 pb-3'>
            <div className='form-control w-full px-3 pb-2'>
              <label className='label' htmlFor={searchId}>
                <span className='label-text line-clamp-1 '>{searchLabel}</span>
              </label>
              <div className='rounded-full relative'>
                <input
                  id={searchId}
                  className='input input-bordered w-full focus:outline-offset-0'
                  placeholder={searchPlaceholder || 'Search'}
                  type='text'
                  autoComplete='off'
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  aria-label='Search for an option'
                />
                {search.length > 0 && (
                  <button
                    type='button'
                    className='btn-ghost p-[7.5px] absolute top-[1px] right-[50px]'
                    onClick={() => setSearch('')}
                    aria-label='Clear search'
                  >
                    <IoCloseSharp className='text-gray-500' size={30} />
                  </button>
                )}

                <div className='absolute right-[20px] top-[15px]'>
                  <BsSearch size={18} className='text-gray-500' />
                </div>
              </div>
            </div>

            <div
              className={`${
                maxHeight ? maxHeight : 'max-h-[200px]'
              } overflow-y-auto px-1.5 pt-3`}
            >
              <ul tabIndex={0} role='listbox'>
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    tabIndex={0}
                    className={`${
                      option.value === 'placeholder'
                        ? 'text-center border-b-[1px] create-border-color pt-2 mb-2'
                        : 'btn-ghost rounded-md py-1 cursor-pointer'
                    } `}
                    role='options'
                    onClick={() => {
                      if (option.value !== 'placeholder') {
                        setIsOpen(!isOpen);
                        setSelectedOption(option);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (option.value !== 'placeholder') {
                          setIsOpen(!isOpen);
                          setSelectedOption(option);
                        }
                      }
                    }}
                    aria-label={`Select ${option.label}`}
                  >
                    {selectedOption?.value === option.value ? (
                      <span className='flex items-center cursor-pointer'>
                        <BsCheck className='h-5 w-5' />
                        {option.label}
                      </span>
                    ) : option.value === 'placeholder' ? (
                      <span className='pointer-events-none text-gray-500 text-center hover:bg-none'>
                        {option.label}
                      </span>
                    ) : (
                      <span className='pl-[20px] cursor-pointer'>
                        {option.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSelect;
