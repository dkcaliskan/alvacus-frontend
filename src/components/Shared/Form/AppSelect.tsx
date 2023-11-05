// Api & Core imports
import React, { FunctionComponent, SelectHTMLAttributes } from 'react';

// Icons & Ui

// Types
interface SelectTypes extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  customStyle?: string;
  customDivStyle?: string;
  isWithInput?: boolean;
}

const AppSelect: FunctionComponent<SelectTypes> = ({
  label,
  customStyle,
  customDivStyle,
  isWithInput,
  ...selectProps
}) => {
  return (
    <div
      className={`form-control ${customDivStyle} ${
        isWithInput && 'min-w-[120px] md:min-w-[150px] lg:min-w-[197px]'
      }`}
    >
      <label className='label' htmlFor={selectProps.id}>
        <span className='label-text line-clamp-1'>{label}</span>
      </label>
      <div className='relative'>
        <select
          {...selectProps}
          className={`select select-bordered w-full focus:outline-offset-0 ${customStyle} ${
            isWithInput && 'rounded-l-none'
          }`}
        >
          {selectProps.children}
        </select>
      </div>
    </div>
  );
};

export default AppSelect;
