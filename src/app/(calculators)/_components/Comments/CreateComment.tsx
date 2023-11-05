'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';

import { AxiosError } from 'axios';

// UI & Icons
import { FiSend } from 'react-icons/fi';

// Components
import AppInput from '@/components/Shared/Form/AppInput';

// Hooks
import useUser from '@/hooks/auth/useUser';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import useComments from '@/hooks/calculators/useComments';

// Types
type CreateCommentTypes = {
  calculatorId: string;
  sortType: string;
  setSortType: (sortType: string) => void;
  commentPostLoading: boolean;
  setCommentPostLoading: (commentPostLoading: boolean) => void;
};

interface ErrorResponse {
  message: string;
}

const CreateComment: FunctionComponent<CreateCommentTypes> = ({
  calculatorId,
  sortType,
  setSortType,
  commentPostLoading,
  setCommentPostLoading,
}) => {
  const { user, isLoading } = useUser();
  const { mutate } = useComments({
    id: calculatorId,
    sortType,
  });

  // Comment states
  const [commentStates, setCommentStates] = useState<{
    value: string;
    error: string;
  }>({
    value: '',
    error: '',
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Blur image url
  const blurredUrl =
    user && user.avatar != undefined
      ? user?.avatar.split('/upload')[0] +
        '/blur:1200' +
        user?.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      return;
    }

    // Check if comment is empty
    if (!commentStates.value) {
      setCommentStates({
        ...commentStates,
        error: 'Please enter a comment',
      });

      return;
    }

    setCommentPostLoading(true);

    try {
      const res = await usePrivateAxios.post(
        `/api/calculators/${calculatorId}/comments`,
        {
          author: user?.userId,
          text: commentStates.value,
        }
      );

      // Check if the request was successful and mutate
      if (res.status === 200) {
        // mutate comments
        await mutate();

        // Reset comment input
        setCommentStates({
          value: '',
          error: '',
        });

        // Update comment sort type
        setSortType('recent');

        setCommentPostLoading(false);
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      setSubmitError(err.response?.data.message || 'Something went wrong!');
    }
  };

  return (
    <div>
      <div>
        <p
          className={`${
            !submitError && 'hidden'
          } bg-error/50 text-center text-white py-1.5 rounded-box my-3`}
        >
          {submitError}
        </p>
      </div>
      <form onSubmit={onSubmit} autoComplete='off'>
        <div className='form-control w-full relative'>
          <AppInput
            label='Add comment'
            type='text'
            placeholder='Add comment...'
            customStyle={`pl-12 pr-[55px] py-6`}
            id='add-comment'
            name='add-comment'
            onChange={(e) => {
              setCommentStates({
                value: e.target.value,
                error: '',
              });
            }}
            value={commentStates.value}
            error={commentStates.error}
            disabled={isLoading || commentPostLoading}
          />

          <div
            className={`mask mask-squircle bg-base-content h-[33px] w-[33px] bg-opacity-[0.01] p-px avatar absolute top-[45px] left-2 ring-1 ring-primary `}
          >
            <Image
              src={`${
                user && user.avatar
                  ? user.avatar
                  : '/assets/images/profile-placeholder.png'
              }`}
              className='mask mask-squircle object-contain'
              width={35}
              height={35}
              alt={`${user ? user.username : ''} Alvacus profile picture`}
              placeholder='blur'
              blurDataURL={
                user?.avatar
                  ? blurredUrl
                  : '/assets/images/profile-placeholder.png'
              }
            />
          </div>
          <button
            className='btn btn-ghost rounded-md rounded-l-none absolute right-[1px] top-[37px]'
            type='submit'
            aria-label='Send comment'
            id='send-comment-btn'
            name='send-comment-btn'
            disabled={isLoading || commentPostLoading}
          >
            <FiSend size={23} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
