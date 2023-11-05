// Api & Core imports
import React, { FunctionComponent, TextareaHTMLAttributes } from 'react';

// Icons & Ui
import { BiError } from 'react-icons/bi';

// Types
interface TextareaTypes extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  customStyle?: string;
}

const AppTextarea: FunctionComponent<TextareaTypes> = ({
  label,
  error,
  customStyle,
  ...textareaProps
}) => {
  return (
    <div className={`form-control`}>
      <label className='label' htmlFor={textareaProps.id}>
        <span className='label-text line-clamp-1'>{label}</span>
      </label>
      <div className='relative'>
        <textarea
          {...textareaProps}
          className={`textarea textarea-bordered h-24 w-full focus:outline-offset-0 ${
            error && 'input-error'
          } ${customStyle}`}
        />

        {error && (
          <div
            className='absolute right-3 top-[13px] text-red-500 transition ease-in-out text-[22px] tooltip tooltip-left lg:tooltip-top'
            id='error-message'
            data-tip={error}
          >
            <BiError />
          </div>
        )}

      </div>
    </div>
  );
};

export default AppTextarea;
