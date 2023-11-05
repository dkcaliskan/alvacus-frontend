'use client';

// Api & Core imports
import React, { FunctionComponent, useMemo, useState } from 'react';
import { AxiosError } from 'axios';

// Ui & Icons
import { BsFlagFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

// Components
import AppButton from '@/components/Shared/Form/AppButton';
import AppInput from '@/components/Shared/Form/AppInput';
import AppTextarea from '@/components/Shared/Form/AppTextarea';
import Loader from '@/components/Shared/UiElements/Loader';
import SuccessMessage from '@/components/Shared/UiElements/Success';

// Hooks
import useUser from '@/hooks/auth/useUser';
import useAxios from '@/hooks/axios/useAxios';

// Types
type ReportTypes = {
  calcId?: string;
  errorOrigin: string;
};

type StateTypes = {
  value: string;
  error: string | boolean;
};

interface ErrorResponse {
  message: string;
}

const Report: FunctionComponent<ReportTypes> = ({ calcId, errorOrigin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const { user } = useUser();

  const [subjectStates, setSubjectStates] = useState<StateTypes>({
    value: errorOrigin,
    error: '',
  });

  const [messageStates, setMessageStates] = useState<StateTypes>({
    value: '',
    error: '',
  });

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
    if (document) {
      (
        document.getElementById('report-modal') as HTMLDialogElement
      ).showModal();

      if (isModalOpen) {
        (document.getElementById('report-modal') as HTMLDialogElement).close();
      }
    }
  };

  // Input error handler
  const inputErrorHandler = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    let error = '';
    switch (id) {
      case 'subject':
        error =
          value.length > 0 && value.length < 5
            ? 'Subject must be at least 5 characters long!'
            : '';
        setSubjectStates({ ...subjectStates, error });
        break;
      case 'message':
        error =
          value.length > 0 && value.length < 10
            ? 'Message must be at least 10 characters long'
            : '';
        setMessageStates({ ...messageStates, error });
        break;
      default:
        break;
    }
  };

  // Check if all fields are valid and enable submit button
  const isInputsValid = useMemo(() => {
    return (
      !subjectStates.error &&
      subjectStates.value.length >= 5 &&
      !messageStates.error &&
      messageStates.value.length >= 10
    );
  }, [
    subjectStates.value,
    subjectStates.error,
    messageStates.value,
    messageStates.error,
  ]);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if all fields are valid
    if (!isInputsValid) {
      return;
    }

    setIsLoading(true);

    try {
      // Send report to server
      const res = await useAxios.post('/api/report/submit', {
        username: user ? user.username : 'Anonymous',
        email: user ? user.email : 'Anonymous',
        calculatorId: calcId,
        subject: subjectStates.value,
        message: messageStates.value,
        title: errorOrigin,
      });

      // Check if report was sent successfully and show success message
      if (res.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          modalHandler();
          setIsSuccess(false);
          setSubjectStates({ ...subjectStates, error: '' });
          setMessageStates({ value: '', error: '' });
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
      <div
        className='tooltip tooltip-left lg:tooltip-top'
        data-tip='Report a issue'
      >
        <button
          className='btn btn-ghost'
          onClick={modalHandler}
          id='modal-open-btn'
          aria-label='Report a issue'
        >
          <BsFlagFill size={22} className='text-error' />
        </button>
      </div>
      <dialog id='report-modal' className='modal'>
        <form
          method='dialog'
          className='modal-box custom-bg-color'
          onSubmit={submitHandler}
        >
          <div className='flex items-center justify-between '>
            <div className='pr-[55px]'></div>
            <h3 className='font-bold text-lg text-center'>Report a issue</h3>
            <button
              className='btn normal-case btn-ghost'
              id='modal-close-btn'
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
                  <AppInput
                    label='Subject'
                    placeholder='Enter the subject'
                    id='subject'
                    type='text'
                    value={subjectStates.value}
                    onChange={(e) =>
                      setSubjectStates({ value: e.target.value, error: '' })
                    }
                    onBlur={inputErrorHandler}
                    error={subjectStates.error as string}
                  />
                </div>
                <div className='mt-1.5'>
                  <AppTextarea
                    label='Message'
                    placeholder='Give us more details about the issue.'
                    id='message'
                    value={messageStates.value}
                    onChange={(e) =>
                      setMessageStates({ value: e.target.value, error: '' })
                    }
                    onBlur={inputErrorHandler}
                    error={messageStates.error as string}
                  />
                </div>
                <div className='mt-6'>
                  <AppButton
                    id='report-submit'
                    customStyle=''
                    type='submit'
                    disabled={!isInputsValid}
                    text='Submit'
                    loading={isLoading}
                    buttonSuccess={isSuccess}
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

export default Report;
