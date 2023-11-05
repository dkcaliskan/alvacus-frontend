'use client';
// Api & Core imports
import React, { FunctionComponent, useEffect, useState, useMemo } from 'react';

// Ui & Icons
import { BiUser } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppTextarea from '@/components/Shared/Form/AppTextarea';
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';

// Hooks
import useUser from '@/hooks/auth/useUser';

// Types
import type { AxiosError } from 'axios';
import useAxios from '@/hooks/axios/useAxios';
type StateTypes = {
  value: string;
  error?: string;
};
interface ErrorResponse {
  message: string;
}

const ContactHandler: FunctionComponent = () => {
  const { user, isLoading } = useUser();

  // Input states
  const [message, setMessage] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [subject, setSubject] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [email, setEmail] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [name, setName] = useState<StateTypes>({
    value: '',
    error: '',
  });

  // Page states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Watch for user data
  useEffect(() => {
    if (user && !dataLoaded) {
      setName({ ...name, value: user.username });
      setEmail({ ...email, value: user.email });
      setDataLoaded(true);
    }

    //! Don't remove this comment eslint disabled because it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, dataLoaded]);

  // Check the input fields are valid
  const isValid = useMemo(() => {
    if (message.value && subject.value) {
      return true;
    }
    return false;
  }, [message, subject]);

  // Submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error
    setIsError(false);

    // Check all the input fields are valid
    if (!isValid) {
      return;
    }

    // Set loading
    setLoading(true);

    // Send request
    try {
      const res = await useAxios.post('/api/contact', {
        username: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      });

      // Check the status
      if (res.status === 200) {
        // Set success
        setIsSuccess(true);
        setLoading(false);

        // Reset form
        setMessage({ ...message, value: '' });
        setSubject({ ...subject, value: '' });
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;

      // Set loading
      setLoading(false);

      // Set error
      if (!err.response) {
        setIsError('Something went wrong. Please try again later.');
      } else {
        setIsError(err.response.data.message);
      }
    }
  };

  if ((!user && isLoading) || loading) {
    return (
      <div className='custom-bg-color  pt-3 pb-6 px-1.5 lg:px-3  rounded-lg lg:rounded-box mt-3 mx-auto flex justify-center items-center min-h-[550px]'>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div>
        {isSuccess && (
          <div className='alert alert-success lgMax:rounded-none prose max-w-none my-3 lg:my-3'>
            <p>
              Thank you for contacting us. We will get back to you as soon as
              possible.
            </p>
          </div>
        )}
      </div>
      <div>
        {isError && (
          <div className='alert alert-error lgMax:rounded-none prose max-w-none my-3 lg:my-3'>
            <p>{isError}</p>
          </div>
        )}
      </div>

      <form
        className='custom-bg-color rounded-box py-3 px-1.5 lg:px-3 w-full'
        autoComplete='off'
        tabIndex={0}
        onSubmit={submitHandler}
      >
        <div className=''>
          <div>
            <AppInput
              id='contact-name'
              type='text'
              label='Name'
              placeholder='Enter your name'
              value={name.value}
              onChange={(e) => setName({ value: e.target.value, error: '' })}
              InputIcon={<BiUser className='input-icon mt-[1px]' />}
              isIcon={true}
              error={name.error}
              onBlur={() => {
                if (!name.value) {
                  setName({ ...name, error: 'Name is required' });
                }
              }}
            />
          </div>

          <div className='mt-3'>
            <AppInput
              id='contact-email'
              type='email'
              label='Email'
              placeholder='Enter your email'
              value={email.value}
              onChange={(e) => setEmail({ value: e.target.value, error: '' })}
              InputIcon={
                <MdOutlineAlternateEmail className='input-icon mt-[1px]' />
              }
              isIcon={true}
              error={email.error}
              onBlur={() => {
                if (!email.value) {
                  setEmail({ ...email, error: 'Email is required' });
                }
              }}
            />
          </div>

          <div className='mt-3'>
            <AppInput
              id='contact-subject'
              type='text'
              label='Subject'
              placeholder='Enter your subject'
              value={subject.value}
              onChange={(e) => setSubject({ value: e.target.value, error: '' })}
              error={subject.error}
              onBlur={() => {
                if (!subject.value) {
                  setSubject({ ...subject, error: 'Subject is required' });
                }
              }}
            />
          </div>

          <div className='mt-3'>
            <AppTextarea
              id='contact-message'
              label='Message'
              placeholder='Enter your message'
              value={message.value}
              onChange={(e) => setMessage({ value: e.target.value, error: '' })}
              error={message.error}
              onBlur={() => {
                if (!message.value) {
                  setMessage({ ...message, error: 'Message is required' });
                }
              }}
            />
          </div>

          <div className='mt-6'>
            <AppButton
              id='contact-submit'
              customStyle=''
              type='submit'
              disabled={!isValid}
              loading={loading}
              text='Submit'
              buttonSuccess={isSuccess}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactHandler;
