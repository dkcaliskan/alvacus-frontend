'use client';
import React, { useEffect, useState, FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Components
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';

// Hooks
import useUser from '@/hooks/auth/useUser';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import { useAuth } from '@/hooks/auth/useAuth';

// Types
import type { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const DeleteAccount: FunctionComponent = () => {
  const router = useRouter();
  const auth = useAuth();
  const { user, isLoading, mutate } = useUser();

  // Check if user is logged in and redirect to login if not
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  const [deleteComments, setDeleteComments] = useState(false);
  const [deleteCalculators, setDeleteCalculators] = useState(false);

  // Submit states
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | boolean>();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successCount, setSuccessCount] = useState(5);

  // Countdown handler
  useEffect(() => {
    if (submitSuccess) {
      const interval = setInterval(() => {
        setSuccessCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [submitSuccess]);

  // Submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error
    setSubmitError(false);

    // Set loading
    setIsSubmitLoading(true);

    try {
      const res = await usePrivateAxios.delete(
        `api/user/delete/${user?.userId}?deleteCalculators=${deleteCalculators}&deleteComments=${deleteComments}`
      );

      if (res.status === 200) {
        setIsSubmitLoading(false);
        setSubmitSuccess(true);
        auth.logout();
        await new Promise((r) => setTimeout(r, 5000));
        mutate();
        router.push('/login');
      }
    } catch (e) {
      setIsSubmitLoading(false);
      const error = e as AxiosError<ErrorResponse>;
      if (error.response?.data) {
        setSubmitError(error.response.data.message);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    }
  };

  if (isLoading || isSubmitLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        {submitSuccess && (
          <div className='alert alert-success lgMax:rounded-none prose max-w-none lg:my-3'>
            <p>
              Your profile has been successfully deleted. You will be redirected
              to the home page in{' '}
              <span className='text-error'>{successCount} </span>seconds.
            </p>
          </div>
        )}
      </div>
      <div>
        {submitError && (
          <div className='alert alert-error lgMax:rounded-none prose max-w-none lg:my-3'>
            <p>{submitError}</p>
          </div>
        )}
      </div>
      <div className='lgMax:px-1.5 '>
        <h1 className='mobileMax:text-xl text-2xl lg:text-3xl font-bold line-clamp-1 mb-3'>
          Delete Account
        </h1>
      </div>
      <form
        className='custom-bg-color lg:rounded-lg  py-3 px-1.5 lg:px-3 w-full'
        autoComplete='off'
        tabIndex={0}
        onSubmit={submitHandler}
      >
        <div className='mt-3 prose max-w-none'>
          <p className='font-bold'>
            If you also want to delete all of your comments and calculators,
            please check the boxes below:
          </p>
        </div>

        <div className='mt-3'>
          <div className='form-control max-w-[250px]'>
            <label className='label cursor-pointer'>
              <span className=''>Delete all calculators</span>
              <input
                type='checkbox'
                className={`toggle ${deleteCalculators && 'toggle-primary'}`}
                checked={deleteCalculators}
                onChange={() => setDeleteCalculators(!deleteCalculators)}
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
                className={`toggle ${deleteComments && 'toggle-primary'}`}
                onChange={() => setDeleteComments(!deleteComments)}
                checked={deleteComments}
              />
            </label>
          </div>
        </div>

        <div className='mt-6 prose max-w-none'>
          <div>
            <p>
              This action cannot be undone. If you have any concerns or
              questions, please
              <Link href={`/contact`} className='px-1 link'>
                Contact.
              </Link>
            </p>
          </div>
        </div>

        <div className='mt-6'>
          <AppButton
            id='profile-submit'
            customStyle={`${submitSuccess ? 'btn-success' : 'btn-error'} `}
            type='submit'
            loading={isSubmitLoading}
            text='Submit'
            buttonSuccess={submitSuccess}
          />
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;
