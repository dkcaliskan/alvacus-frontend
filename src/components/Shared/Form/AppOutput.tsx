// Api & Core imports
import React, { FunctionComponent, InputHTMLAttributes } from 'react';

// Icons & Ui
import { BiError } from 'react-icons/bi';

// Types
interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  customStyle?: string;
}

const AppOutput: FunctionComponent<InputTypes> = ({
  label,
  customStyle,
  ...inputProps
}) => {
  return (
    <div className={`form-control w-full`}>
      <label className='label' htmlFor={inputProps.id}>
        <span className='label-text line-clamp-1'>{label}</span>
      </label>
      <div className='relative'>
        <input
          {...inputProps}
          className={`input input-bordered w-full !cursor-default ${customStyle} ${
            inputProps.value && 'output-text-color'
          }`}
          disabled
        />
      </div>
    </div>
  );
};

export default AppOutput;
