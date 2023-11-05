'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/navigation';

// UI & Icons
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';

// Components
import Loader from '@/components/Shared/UiElements/Loader';
import SuccessMessage from '@/components/Shared/UiElements/Success';
import AppButton from '@/components/Shared/Form/AppButton';

// Hooks
import useUser from '@/hooks/auth/useUser';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import type { AxiosError } from 'axios';
type DeleteCalculatorTypes = {
  calculatorId: string;
  calculatorTitle: string;
};

interface ErrorResponse {
  message: string;
}

const DeleteCalculator: FunctionComponent<DeleteCalculatorTypes> = ({
  calculatorId,
  calculatorTitle,
}) => {
  const router = useRouter();

  // Calculator delete states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  // Get user
  const { user } = useUser();

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
    setIsError(false);
    setIsSuccess(false);

    if (document) {
      (
        document.getElementById(
          `delete-calculator-modal-${calculatorId}`
        ) as HTMLDialogElement
      ).showModal();

      if (isModalOpen) {
        (
          document.getElementById(
            `delete-calculator-modal-${calculatorId}`
          ) as HTMLDialogElement
        ).close();
      }
    }
  };

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setIsError('You must be logged in to delete a comment.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await usePrivateAxios.delete(
        `/api/calculators/delete/${calculatorId}`
      );

      // Check if the request was successful
      if (res.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
        setIsError(false);

        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      setIsLoading(false);
      setIsError(err.response?.data.message || 'Something went wrong!');
    }
  };

  // Success message component
  const SuccessComponent = () => {
    return (
      <SuccessMessage>
        <div className='prose max-w-none -mt-6'>
          <p className='mb-6  text-center'>
            Your calculator has been successfully deleted.
          </p>
        </div>
      </SuccessMessage>
    );
  };

  return (
    <div>
      <div
        className='tooltip tooltip-left lg:tooltip-bottom'
        data-tip='Delete calculator'
      >
        <button
          type='button'
          className='btn btn-ghost'
          onClick={modalHandler}
          id='delete-calculator-btn'
          aria-label='Delete calculator'
        >
          <AiOutlineDelete size={24} className='' />
        </button>
      </div>
      <dialog id={`delete-calculator-modal-${calculatorId}`} className='modal'>
        <form
          method='dialog'
          className='modal-box custom-bg-color'
          onSubmit={submitHandler}
        >
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
              Delete calculator
            </h3>
            <button
              className='btn normal-case btn-ghost'
              id='modal-close-btn'
              onClick={modalHandler}
              type='button'
              aria-label='Close modal'
            >
              <IoCloseSharp size={24} />
            </button>
          </div>

          <div className='py-4'>
            {isLoading ? (
              <Loader />
            ) : isSuccess ? (
              <div>
                <SuccessComponent />
              </div>
            ) : (
              <div>
                <div>
                  <p
                    className={`${
                      !isError && 'hidden'
                    } bg-error/50 text-center text-white py-1.5 rounded-box my-3`}
                  >
                    {isError}
                  </p>
                </div>
                <div className='prose max-w-none'>
                  <h3 className='text-lg'>
                    Are you sure you want to delete this {calculatorTitle}{' '}
                    calculator?
                  </h3>
                  <p className=''>This action cannot be undone.</p>
                </div>
                <div className='flex justify-end mt-6 gap-1'>
                  <AppButton
                    id='cancel'
                    type='button'
                    customStyle='w-max btn-sm'
                    onClick={modalHandler}
                    text='Cancel'
                    aria-label='Cancel delete calculator'
                  />
                  <AppButton
                    id='delete'
                    type='submit'
                    customStyle='w-max btn-sm btn-ghost'
                    text='Delete'
                    aria-label='Delete calculator'
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default DeleteCalculator;
