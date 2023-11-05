'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';

// UI & Icons
import { FiSend } from 'react-icons/fi';

// Components
import AppInput from '@/components/Shared/Form/AppInput';

// Hooks
import useUser from '@/hooks/auth/useUser';
import useComments from '@/hooks/calculators/useComments';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

//Types
import type { AxiosError } from 'axios';
type CreateReplyTypes = {
  calculatorId: string;
  setShowReply: (showReply: boolean) => void;
  isReplyLoading: boolean;
  setIsReplyLoading: (replyLoading: boolean) => void;
  isReply: boolean;
  sortType: string;
  commentId: string;
};

interface ErrorResponse {
  message: string;
}

const CreateReply: FunctionComponent<CreateReplyTypes> = ({
  calculatorId,
  isReply,
  sortType,
  setShowReply,
  isReplyLoading,
  setIsReplyLoading,
  commentId,
}) => {
  const { user, isLoading } = useUser();
  const { mutate } = useComments({
    id: calculatorId,
    sortType,
  });

  // Reply states
  const [replyStates, setReplyStates] = useState({
    value: '',
    error: '',
  });

  const [submitError, setSubmitError] = useState<string | boolean>('');

  // Blur image url
  const blurredUrl =
    user && user.avatar != undefined
      ? user?.avatar.split('/upload')[0] +
        '/blur:1200' +
        user?.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      return;
    }

    // Check if reply is empty
    if (!replyStates.value) {
      setReplyStates({
        value: '',
        error: 'Reply cannot be empty',
      });
      return;
    }

    setIsReplyLoading(true);

    try {
      const res = await usePrivateAxios.post(
        `/api/calculators/comments/${commentId}/reply`,
        {
          author: user?.userId,
          text: replyStates.value,
          calculatorId: calculatorId,
        }
      );

      // If reply is successful mutate comments
      if (res.status === 200) {
        // mutate comments
        await mutate();

        // Reset reply states
        setReplyStates({
          value: '',
          error: '',
        });

        // Open reply input
        setShowReply(true);

        // Set reply loading to false
        setIsReplyLoading(false);
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      setSubmitError(err.response?.data.message || 'Something went wrong!');
    }
  };

  return (
    <div>
      {isReply && (
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
          <form autoComplete='off' onSubmit={submitHandler}>
            <div className='form-control w-full relative'>
              <AppInput
                type='text'
                label='Reply'
                placeholder='Reply'
                customStyle='pl-12 pr-[55px] py-6'
                id='reply-comment'
                name='reply-comment'
                onChange={(e) =>
                  setReplyStates({ value: e.target.value, error: '' })
                }
                value={replyStates.value}
                error={replyStates.error}
                disabled={isLoading || isReplyLoading}
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
                id='submit-reply'
                aria-label='Submit reply'
                type='submit'
                disabled={isLoading || isReplyLoading}
              >
                <FiSend size={23} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateReply;
