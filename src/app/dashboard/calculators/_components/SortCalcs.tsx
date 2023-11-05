'use client';
// API & Core
import { FunctionComponent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Icons & Ui
import { AiOutlineSortAscending } from 'react-icons/ai';

const SortCalcsDashboard: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const sort = params.get('sort') || 'recent';

  const [selectedSort, setSelectedSort] = useState(sort);

  const sortSelectHandler = (type: string) => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update sort type state
    setSelectedSort(type);

    // Update the sort query
    updateParams.set('sort', type);

    // Update the page query to 1 to reset the pagination
    updateParams.set('page', '1');

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());
  };

  return (
    <div className='dropdown  dropdown-end z-40'>
      <label tabIndex={0} className='btn normal-case btn-ghost'>
        <AiOutlineSortAscending className='' role='' size={25} />
      </label>
      <div
        tabIndex={0}
        className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52'
      >
        <button
          onClick={() => {
            sortSelectHandler('recent');
          }}
          className={`${
            selectedSort === 'recent'
              ? 'custom-sort-bg cursor-default'
              : 'cursor-pointer btn-ghost'
          } text-sm w-full pl-4 rounded-lg py-1.5 transition ease-in-out duration-200`}
        >
          <p>Recent</p>
        </button>

        <button
          onClick={() => {
            sortSelectHandler('popular');
          }}
          className={`${
            selectedSort === 'popular'
              ? 'custom-sort-bg cursor-default'
              : 'cursor-pointer btn-ghost'
          } text-sm w-full pl-4 rounded-lg py-1.5  transition ease-in-out duration-200 mt-1.5`}
        >
          <p>Popular</p>
        </button>
      </div>
    </div>
  );
};

export default SortCalcsDashboard;
