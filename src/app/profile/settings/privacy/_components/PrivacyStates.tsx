'use client';
import React, { useEffect, useMemo, useState, FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';

// Components
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';

// Hooks
import useUser from '@/hooks/auth/useUser';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import type { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const PrivacyStates: FunctionComponent = () => {
  const router = useRouter();
  const { user, isLoading, mutate } = useUser();

  // Check if user is logged in and redirect to login if not
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  const [showSavedCalculators, setShowSavedCalculators] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Submit states
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | boolean>();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Check if any of the states are changed
  const isStateChanged = useMemo(() => {
    if (user && isDataLoaded) {
      return (
        showSavedCalculators !== user?.privacySettings.showSavedCalculators ||
        showComments !== user?.privacySettings.showComments
      );
    }
    return false;
  }, [user, showSavedCalculators, showComments, isDataLoaded]);

  // Watch for user data
  useEffect(() => {
    if (user && !isDataLoaded) {
      setShowSavedCalculators(user.privacySettings.showSavedCalculators);
      setShowComments(user.privacySettings.showComments);
      setIsDataLoaded(true);
    }

    //! Don't remove this comment eslint disabled because it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isDataLoaded, isLoading]);

  // Submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error
    setSubmitError(false);

    // Check if any of the states are changed
    if (!isStateChanged) {
      return;
    }

    // Set loading
    setIsSubmitLoading(true);

    // Submit data
    try {
      const res = await usePrivateAxios.put(
        `/api/user/change-privacy/${user?.userId}`,
        {
          privacySetting: {
            showSavedCalculators,
            showComments,
          },
        }
      );

      if (res.status === 200) {
        // Set success
        setSubmitSuccess(true);

        // Update user data
        mutate();
        router.refresh();

        // Set loading
        setIsSubmitLoading(false);
      }
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      // Set error
      setSubmitError(error?.response?.data?.message || 'Something went wrong!');

      // Set loading
      setIsSubmitLoading(false);
    }
  };
  if (isLoading || !isDataLoaded || isSubmitLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        {submitSuccess && (
          <div className='alert alert-success lgMax:rounded-none prose max-w-none lg:my-3'>
            <p>Your profile has been updated successfully.</p>
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
          Privacy Settings
        </h1>
      </div>
      <form
        className='custom-bg-color lg:rounded-lg  py-3 px-1.5 lg:px-3 w-full'
        autoComplete='off'
        tabIndex={0}
        onSubmit={submitHandler}
      >
        <div className='mt-6'>
          <div className='form-control max-w-[370px]'>
            <label className='label cursor-pointer'>
              <span className=''>Show saved calculators in my profile</span>
              <input
                type='checkbox'
                className={`toggle ${showSavedCalculators && 'toggle-primary'}`}
                checked={showSavedCalculators || false}
                onChange={() => setShowSavedCalculators(!showSavedCalculators)}
              />
            </label>
          </div>
        </div>

        <div className='mt-6'>
          <AppButton
            id='profile-submit'
            customStyle=''
            type='submit'
            disabled={!isStateChanged}
            loading={isSubmitLoading}
            text='Save changes'
            buttonSuccess={submitSuccess}
          />
        </div>
      </form>
    </div>
  );
};

export default PrivacyStates;
