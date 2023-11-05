'use client';

// Api & Core imports
import React, { FunctionComponent } from 'react';

// Components
import ButtonSpinner from './ButtonSpinner';

// Types
type AppButtonTypes = {
  id: string;
  customStyle?: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  loading?: boolean;
  text: string;
  secondary?: boolean;
  buttonSuccess?: boolean;
};

const AppButton: FunctionComponent<AppButtonTypes> = ({
  id,
  customStyle,
  disabled,
  type,
  onClick,
  loading,
  text,
  secondary,
  buttonSuccess,
}) => {
  return (
    <button
      id={id}
      disabled={loading ? true : disabled ? true : false}
      onClick={onClick}
      type={type}
      className={`${customStyle} btn ${!secondary && 'btn-primary'} w-full ${
        buttonSuccess && 'btn-success pointer-events-none cursor-default'
      } ${disabled && 'pointer-events-none cursor-default'}`}
    >
      {buttonSuccess ? (
        'Success'
      ) : loading ? (
        <div className='flex items-center text-center justify-center'>
          <p className='mr-2'>Processing</p> <ButtonSpinner />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default AppButton;
