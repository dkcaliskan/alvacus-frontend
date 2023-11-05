// Api & Core imports

import { FunctionComponent } from 'react';

// Types
type ToastTypes = {
  message: string;
  status: string;
  customStyle?: string;
};

const Toast: FunctionComponent<ToastTypes> = ({
  message,
  status,
  customStyle,
}) => {
  return (
    <div
      className={`alert ${status} shadow-lg absolute top-4 right-0 left-0 max-w-max mx-auto ${customStyle} z-40`}
    >
      <div className='flex items-center'>
        {status === 'alert-error' ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current flex-shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current flex-shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )}
        <span className='ml-1'>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
