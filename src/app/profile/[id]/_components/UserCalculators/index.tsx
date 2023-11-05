'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';

// Components
import UserCalculatorListSelect from './ListSelect';
import UserCalculatorSort from './Sort';

// Types
import type { UserTypes } from '@/types/user.d';
import UserCalculatorList from './CalculatorList';
type UserCalculatorTypes = {
  user: UserTypes;
};

const UserCalculators: FunctionComponent<UserCalculatorTypes> = ({ user }) => {
  // States
  const [selectedList, setSelectedList] = useState('my');
  const [selectedSort, setSelectedSort] = useState('recent');

  return (
    <div>
      <div className='flex items-center justify-between border-b-[1px] custom-border-color'>
        <div className='lgMax:px-1.5 hidden'>
          <h2 className='text-2xl font-bold line-clamp-1'>
            Created calculators by {user.username}
          </h2>
        </div>
        <UserCalculatorListSelect
          showSavedCalculators={user.privacySettings.showSavedCalculators}
          showComments={user.privacySettings.showComments}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
        <UserCalculatorSort
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </div>

      <div className='pt-3'>
        <UserCalculatorList
          selectedList={selectedList}
          selectedSort={selectedSort}
        />
      </div>
    </div>
  );
};

export default UserCalculators;
