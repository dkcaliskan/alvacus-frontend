'use client';

// API & Core
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AxiosError } from 'axios';

// UI & Icons
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

// Components
import Toast from '../UiElements/Toast';

// Hooks
import useUser from '@/hooks/auth/useUser';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import useSavedCalcs from '@/hooks/calculators/useSavedCalcs';
import useAllCalcs from '@/hooks/calculators/useAllCalcs';
import useMyCalcs from '@/hooks/calculators/useMyCalcs';

// Types
type SaveCalculatorTypes = {
  savedUsers: { userId: string }[];
  calcId: string;
  userId: string;
};

interface ErrorResponse {
  message: string;
}

const SaveCalculator: FunctionComponent<SaveCalculatorTypes> = ({
  savedUsers,
  calcId,
  userId,
}) => {
  const { user, isLoading, error, isValidating } = useUser();

  const [saveError, setSaveError] = useState<string | boolean>(false);
  const [isSaved, setIsSaved] = useState<number>(-1);
  const params = useSearchParams();

  const page = params.get('page') || 1;
  const sortType = params.get('sort') || 'recent';
  const search = params.get('search') || '';
  const tag = params.get('tag') || '';

  const { mutate: saveMutate } = useSavedCalcs({
    page: '1',
    sortType: 'popular',
    search: '',
    tag: 'all',
    userId,
  });

  const { mutate: saveRecentMutate } = useSavedCalcs({
    page: '1',
    search: '',
    tag: 'all',
    userId,
  });

  const { mutate: allMutate } = useAllCalcs({
    page,
    sortType,
    search,
    tag,
  });
  const { mutate: myCalcMutate } = useMyCalcs({
    page,
    search,
    tag: 'all',
    userId,
  });

  const saveHandler = async () => {
    try {
      // Update the savedUsers array with the new userId
      const updatedData = {
        savedUsers: [...savedUsers, { userId: user?.userId }],
      };

      // Update the state to show the bookmark icon
      setIsSaved(updatedData.savedUsers.length - 1);

      // Update the database
      const response = await usePrivateAxios.post(
        `/api/calculators/${calcId}/${user?.userId}/save`
      );

      // If the response is successful, mutate the cached calculators
      if (response.status === 200) {
        saveMutate();
        allMutate();
        myCalcMutate();
        saveRecentMutate();
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      if (!err?.response) {
        setSaveError('No server response');
      } else {
        setSaveError(err.response?.data.message);
      }
    }
  };

  const unSaveHandler = async () => {
    try {
      // Update the savedUsers array with the new userId
      setIsSaved(-1);

      // Update the database
      const response = await usePrivateAxios.post(
        `/api/calculators/${calcId}/${user?.userId}/unSave`
      );

      // If the response is successful, mutate the cached calculators
      if (response.status === 200) {
        saveMutate();
        allMutate();
        myCalcMutate();
        saveRecentMutate();
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      if (!err?.response) {
        setSaveError('No server response');
      } else {
        setSaveError(err.response?.data.message);
      }

      // Remove the bookmark icon if the request fails
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSaveError(false);
    }
  };
  useEffect(() => {
    // Check if the user has already saved the calculator
    if (savedUsers && user?.userId) {
      const index = savedUsers.findIndex((u) => u.userId === user.userId);

      // If the user has saved the calculator, show the bookmark icon
      setIsSaved(index);
    } else {
      // If the user has not saved the calculator, show the bookmark outline icon
      setIsSaved(-1);
    }
  }, [savedUsers, user?.userId]);

  if (!user || error) {
    return (
      <div
        className='tooltip tooltip-left   z-10'
        data-tip='Save to your profile'
        id='save-button'
      >
        <Link
          href='/login'
          as='/login'
          className='btn btn-ghost rounded-tr-xl'
          aria-label='go to login page'
        >
          <BsBookmark size={22} />
        </Link>
      </div>
    );
  }
  if (isLoading || isValidating) {
    return (
      <div
        className='tooltip tooltip-left  z-10'
        data-tip='Save to your profile'
      >
        <button
          className='btn btn-ghost rounded-tr-xl'
          aria-label='Save calculator to your profile'
          id={`save-button-${calcId}`}
          name={`save-button-${calcId}`}
          type='button'
        >
          <BsBookmark size={22} />
        </button>
      </div>
    );
  }

  return (
    <div className=''>
      {saveError && (
        <Toast
          message='Something went wrong, please try again.'
          status='alert-error'
          customStyle={`golden-drawer`}
        />
      )}
      {isSaved !== -1 ? (
        <div
          className='tooltip tooltip-left  z-10'
          data-tip='Remove from your profile'
        >
          <button
            onClick={unSaveHandler}
            className='btn btn-ghost rounded-tr-xl'
            id={`unSave-button-${calcId}`}
            name={`unSave-button-${calcId}`}
            type='button'
            aria-label='Remove calculator from your profile'
          >
            <BsBookmarkFill size={22} className='text-warning' />
          </button>
        </div>
      ) : (
        <div
          className='tooltip tooltip-left  z-10'
          data-tip='Save to your profile'
        >
          <button
            onClick={saveHandler}
            className='btn btn-ghost rounded-tr-xl'
            id={`save-button-${calcId}`}
            name={`save-button-${calcId}`}
            type='button'
            aria-label='Save calculator to your profile'
          >
            <BsBookmark size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SaveCalculator;
