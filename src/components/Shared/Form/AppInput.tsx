// Api & Core imports
import React, { FunctionComponent, InputHTMLAttributes } from 'react';

// Icons & Ui
import { BiError } from 'react-icons/bi';

// Types
interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  InputIcon?: React.ReactNode;
  isIcon?: boolean;
  customStyle?: string;
  PasswordToggler?: React.ReactNode;
  passwordErrorIconStyle?: string;
}

const AppInput: FunctionComponent<InputTypes> = ({
  label,
  error,
  InputIcon,
  isIcon,
  customStyle,
  PasswordToggler,
  passwordErrorIconStyle,
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
          autoComplete='off'
          className={`input input-bordered w-full focus:outline-offset-0 ${
            error && 'input-error'
          } ${isIcon && 'pl-9'} ${customStyle}`}
          inputMode={inputProps.type === 'number' ? 'numeric' : undefined}
        />

        {InputIcon}

        {error && (
          <div
            className={`absolute right-3 top-[13px] text-red-500 transition ease-in-out text-[22px] tooltip tooltip-left lg:tooltip-top ${passwordErrorIconStyle}`}
            id='error-message'
            data-tip={error}
          >
            <BiError />
          </div>
        )}

        {PasswordToggler}
      </div>
    </div>
  );
};

export default AppInput;
