// API & Core
import React, { FunctionComponent } from 'react';

// Components
import ListSelect from './ListSelect';
import SortCalcs from './SortCalcs';
import CalculatorList from './CalculatorList';
import SearchCalcs from './Search';

const HomeComponents: FunctionComponent = () => {
  return (
    <div>
      <SearchCalcs />

      <div className='flex items-center justify-between border-b-[1px] custom-border-color'>
        <div className='lgMax:px-1.5 hidden'>
          <h1 className='text-2xl font-bold line-clamp-1'>
            Alvacus All Calculators
          </h1>
        </div>

        <ListSelect />
        <SortCalcs />
      </div>

      <div className='pt-3 '>
        <CalculatorList />
      </div>
    </div>
  );
};

export default HomeComponents;
