'use client';

// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// UI & Icons
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';

// Components
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';
import SuccessMessage from '@/components/Shared/UiElements/Success';

// Hooks
import useUsers from '@/hooks/dashboard-get/useUsers';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import type { AxiosError } from 'axios';
type DeleteUserTypes = {
  userId: string;
};
interface ErrorResponse {
  message: string;
}

const DeleteUser: FunctionComponent<DeleteUserTypes> = ({ userId }) => {
  const params = useSearchParams();

  const search = params.get('search') || '';
  const page = params.get('page');

  // Get the users data
  const { mutate } = useUsers({
    page: page || '1',
    sortType: 'recent',
    search: search || '',
  });

  // User delete states
  const [deleteComments, setDeleteComments] = useState(false);
  const [deleteCalculators, setDeleteCalculators] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
    setIsError(false);
    setIsSuccess(false);

    if (document) {
      (
        document.getElementById(
          `delete-user-modal-${userId}`
        ) as HTMLDialogElement
      ).showModal();

      if (isModalOpen) {
        (
          document.getElementById(
            `delete-user-modal-${userId}`
          ) as HTMLDialogElement
        ).close();
      }
    }
  };

  // Success message component
  const SuccessComponent = () => {
    return (
      <SuccessMessage>
        <div className='prose max-w-none -mt-6'>
          <p className='mb-6  text-center'>
            User has been deleted successfully.
          </p>
        </div>
      </SuccessMessage>
    );
  };

  // Submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error
    setIsError(false);

    // Set loading
    setIsLoading(true);

    try {
      const res = await usePrivateAxios.delete(
        `api/user/delete/${userId}?deleteCalculators=${deleteCalculators}&deleteComments=${deleteComments}`
      );

      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);

        mutate();
      }
    } catch (e) {
      setIsLoading(false);
      const error = e as AxiosError<ErrorResponse>;
      if (error.response?.data) {
        setIsError(error.response.data.message);
      } else {
        setIsError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className='-mt-1.5'>
      <div className='tooltip tooltip-left' data-tip='Delete user'>
        <button
          type='button'
          className='btn btn-ghost rounded-tr-xl rounded-br-none rounded-tl-none'
          onClick={modalHandler}
          id='delete-user-btn'
          aria-label='Delete user'
        >
          <AiOutlineDelete size={24} className='' />
        </button>
      </div>
      <dialog id={`delete-user-modal-${userId}`} className='modal'>
        <form
          method='dialog'
          className='modal-box custom-bg-color'
          onSubmit={submitHandler}
        >
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
              Delete user
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
                    Are you sure you want to delete this user?
                  </h3>
                </div>
                <div className='mt-3'>
                  <div className='form-control max-w-[250px]'>
                    <label className='label cursor-pointer'>
                      <span className=''>Delete all calculators</span>
                      <input
                        type='checkbox'
                        className={`toggle ${
                          deleteCalculators && 'toggle-primary'
                        }`}
                        checked={deleteCalculators}
                        onChange={() =>
                          setDeleteCalculators(!deleteCalculators)
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className='mt-3'>
                  <div className='form-control max-w-[250px]'>
                    <label className='label cursor-pointer'>
                      <span className=''>Delete all comments</span>
                      <input
                        type='checkbox'
                        className={`toggle ${
                          deleteComments && 'toggle-primary'
                        }`}
                        onChange={() => setDeleteComments(!deleteComments)}
                        checked={deleteComments}
                      />
                    </label>
                  </div>
                </div>
                <div className='flex justify-end mt-6 gap-1'>
                  <AppButton
                    id='cancel'
                    type='button'
                    customStyle='w-max btn-sm'
                    onClick={modalHandler}
                    text='Cancel'
                    aria-label='Cancel delete comment'
                  />
                  <AppButton
                    id='delete'
                    type='submit'
                    customStyle='w-max btn-sm btn-ghost'
                    text='Delete'
                    aria-label='Delete comment'
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

export default DeleteUser;
