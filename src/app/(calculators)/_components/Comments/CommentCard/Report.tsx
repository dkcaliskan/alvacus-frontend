'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';

// Icons & UI
import { IoCloseSharp } from 'react-icons/io5';
import { BsFlagFill } from 'react-icons/bs';

// Components
import Loader from '@/components/Shared/UiElements/Loader';
import SuccessMessage from '@/components/Shared/UiElements/Success';
import AppButton from '@/components/Shared/Form/AppButton';
import AppCheckbox from '@/components/Shared/Form/AppCheckbox';

// Hooks
import useAxios from '@/hooks/axios/useAxios';
import useUser from '@/hooks/auth/useUser';

// Types
import type { AxiosError } from 'axios';

type CommentReportTypes = {
  calculatorId: string;
  calculatorTitle: string;
  commentContent: string;
  commentId: string;
};

interface ErrorResponse {
  message: string;
}

const CommentReport: FunctionComponent<CommentReportTypes> = ({
  calculatorId,
  calculatorTitle,
  commentContent,
  commentId,
}) => {
  const { user } = useUser();

  // Comment report states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  // Comment report reasons
  const [reportReasons, setReportReasons] = useState<string[]>([]);

  // Handle modal open/close
  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
    setIsError(false);

    if (document) {
      (
        document.getElementById(
          `report-comment-modal-${commentId}`
        ) as HTMLDialogElement
      ).showModal();
      if (isModalOpen) {
        (
          document.getElementById(
            `report-comment-modal-${commentId}`
          ) as HTMLDialogElement
        ).close();
      }
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (value: string, checked: boolean) => {
    setReportReasons((prevSelectedValues) => {
      // If the checkbox is checked, add the value to the array
      if (checked) {
        return [...prevSelectedValues, value];
      }
      // If the checkbox is unchecked, remove the value from the array
      else {
        return prevSelectedValues.filter(
          (selectedValue) => selectedValue !== value
        );
      }
    });
  };

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const request = await useAxios.post(`/api/report/comment-report`, {
        username: user ? user.username : 'Anonymous',
        email: user ? user.email : 'Anonymous',
        calculatorId,
        title: calculatorTitle,
        commentContent,
        commentId,
        reportReasons,
      });

      // Check if the request was successful
      if (request.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
        setIsError(false);

        // Clear selected checkboxes
        setReportReasons([]);
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
            Your report has been sent successfully.
            <br />
            Will review it and take the necessary action.
          </p>
        </div>
      </SuccessMessage>
    );
  };

  return (
    <div>
      <div className='tooltip tooltip-left' data-tip='Report comment'>
        <button
          className='btn btn-ghost '
          type='button'
          onClick={modalHandler}
          id='report-comment'
          name='report-comment'
          aria-label='Report comment'
        >
          <BsFlagFill size={20} className='text-error' />
        </button>
      </div>
      <dialog id={`report-comment-modal-${commentId}`} className='modal'>
        <form
          method='dialog'
          onSubmit={submitHandler}
          className='modal-box custom-bg-color'
        >
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-bold'>Report comment</h3>
            <button
              className='btn btn-ghost normal-case'
              type='button'
              aria-label='Close modal'
              onClick={modalHandler}
            >
              <IoCloseSharp size={25} />
            </button>
          </div>
          <div className='py-4'>
            {isLoading ? (
              <Loader />
            ) : isSuccess ? (
              <SuccessComponent />
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
                <div className='px-3 '>
                  <AppCheckbox
                    id='unwanted-content-comment'
                    value='unwanted-content-comment'
                    onChange={handleCheckboxChange}
                    label='Unwanted comment content or spam'
                    checked={
                      reportReasons.includes('unwanted-content-comment') ||
                      false
                    }
                  />

                  <div className='py-1'>
                    <AppCheckbox
                      id='child-abuse-comment'
                      value='child-abuse-comment'
                      onChange={handleCheckboxChange}
                      label='Child abuse'
                      checked={
                        reportReasons.includes('child-abuse-comment') || false
                      }
                    />
                  </div>

                  <div className='py-1'>
                    <AppCheckbox
                      id='hate-speech-comment'
                      value='hate-speech-comment'
                      onChange={handleCheckboxChange}
                      label='Hate speech or graphic violence'
                      checked={
                        reportReasons.includes('hate-speech-comment') || false
                      }
                    />
                  </div>

                  <div className='py-1'>
                    <AppCheckbox
                      id='promotes-terrorism-comment'
                      value='promotes-terrorism-comment'
                      label='Promotes terrorism'
                      checked={
                        reportReasons.includes('promotes-terrorism-comment') ||
                        false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </div>

                  <div className='py-1'>
                    <AppCheckbox
                      id='harassment-comment'
                      value='harassment-comment'
                      label='Harassment or bullying'
                      checked={
                        reportReasons.includes('harassment-comment') || false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </div>

                  <div className='py-1'>
                    <AppCheckbox
                      id='misinformation-comment'
                      value='misinformation-comment'
                      label='Misinformation'
                      checked={
                        reportReasons.includes('misinformation-comment') ||
                        false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
                <div className='flex items-center gap-3 justify-end px-1.5 py-3'>
                  <AppButton
                    id='cancel'
                    type='button'
                    customStyle='w-max btn-sm'
                    onClick={modalHandler}
                    text='Cancel'
                    aria-label='Cancel report comment'
                  />
                  <AppButton
                    id='report'
                    type='submit'
                    customStyle='w-max btn-sm btn-ghost'
                    text='Report'
                    aria-label='Report comment'
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

export default CommentReport;
