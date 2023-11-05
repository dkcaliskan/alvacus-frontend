// Api & Core imports
import React, { FunctionComponent } from 'react';

// Icons & Ui
import { AiOutlineSortAscending } from 'react-icons/ai';

type UserCalculatorSortTypes = {
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
};

const UserCalculatorSort: FunctionComponent<UserCalculatorSortTypes> = ({
  selectedSort,
  setSelectedSort,
}) => {
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
            setSelectedSort('recent');
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
            setSelectedSort('popular');
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

export default UserCalculatorSort;
