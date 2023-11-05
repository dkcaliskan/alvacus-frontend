// Api & Core imports
import React, { FunctionComponent } from 'react';

// Types
import type { SelectUnitTypes } from '@/types/calculators.d';

type AppModularSelectTypes = {
  selectLabel: string;
  selectId?: string;
  selectedUnit: string;
  selectCustomLabel?: string;
  selectBaseUnit?: SelectUnitTypes;
  /* setSelectedUnit: React.Dispatch<React.SetStateAction<string>>; */
  selectHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedUnits?: SelectUnitTypes[];
};

const AppModularSelect: FunctionComponent<AppModularSelectTypes> = ({
  selectLabel,
  selectedUnit,
  selectId,
  selectBaseUnit,
  selectedUnits,
  selectCustomLabel,
  selectHandler,
}) => {
  return (
    <div>
      <div className='form-control max-w-[120px] md:max-w-[150px] lg:max-w-[197px] '>
        <label
          className='label w-max max-w-[120px] md:max-w-[150px] lg:max-w-[197px] lg:min-w-[197px] line-clamp-1'
          htmlFor={
            selectId
              ? selectId
              : `${selectLabel!.toLowerCase().replaceAll(' ', '-')}-select`
          }
        >
          <span className='label-text line-clamp-1'>
            {selectCustomLabel
              ? selectCustomLabel
              : `Select unit for "${selectLabel}"`}
          </span>
        </label>
        <select
          className='select select-bordered  rounded-l-none focus:outline-offset-0 line-clamp-1 min-w-[120px] md:min-w-[150px] lg:min-w-[197px] w-full'
          id={
            selectId
              ? selectId
              : `${selectLabel!.toLowerCase().replaceAll(' ', '-')}-select`
          }
          onChange={(e) => selectHandler(e)}
          defaultValue={selectBaseUnit?.value}
        >
          {selectBaseUnit && (
            <option value={selectBaseUnit.value}>{selectBaseUnit.label}</option>
          )}
          {selectedUnits!.map((option, index) => (
            <option key={index} value={option.value.toLowerCase()}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AppModularSelect;
