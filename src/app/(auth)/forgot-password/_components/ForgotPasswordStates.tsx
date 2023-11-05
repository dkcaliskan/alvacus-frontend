'use client';

// Api & Core
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// Ui & Icons
import { BiUser } from 'react-icons/bi';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';

// Context, Hooks & Utils
import { AuthContext } from '@/context/authContext';
import useUser from '@/hooks/auth/useUser';
import useAxios from '@/hooks/axios/useAxios';

// Types
import type { AxiosError } from 'axios';
interface ErrorResponse {
  message: string;
}

const ForgotPasswordStates: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const auth = useContext(AuthContext);
  const { user, isLoading, mutate } = useUser();

  // Check if user is logged in and redirect to home page if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  // >Email states
  const [emailState, setEmailState] = useState<{
    value: string;
    error?: string;
  }>({
    value: '',
    error: '',
  });

  // Submit States
  const [submitStates, setSubmitStates] = useState({
    isSubmitLoading: false,
    buttonSuccess: false,
    error: '',
  });

  // Check if all fields are valid and enable submit button
  const isButtonDisabled = useMemo(() => {
    return submitStates.isSubmitLoading || !emailState.value;
  }, [submitStates.isSubmitLoading, emailState.value]);

  // Blur error handler
  const onBlurHandler = (e: { target: { id: string } }) => {
    switch (e.target.id) {
      case 'email':
        if (!emailState.value) {
          setEmailState((prev) => ({
            ...prev,
            error: 'Email is required',
          }));
        }
        // Check if email is valid using regex
        if (
          !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(emailState.value) &&
          emailState.value.length > 0
        ) {
          setEmailState((prev) => ({
            ...prev,
            error: 'Email is invalid',
          }));
        }

        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Reset error
    setSubmitStates((prev) => ({ ...prev, error: '' }));

    // Reset success
    setSubmitStates((prev) => ({ ...prev, buttonSuccess: false }));

    // Reset email error
    setEmailState((prev) => ({ ...prev, error: '' }));

    // Check if email is empty
    if (!emailState.value) {
      setEmailState((prev) => ({ ...prev, error: 'Email is required' }));
      return;
    }

    // Set loading state
    setSubmitStates((prev) => ({ ...prev, isSubmitLoading: true }));

    try {
      const res = await useAxios.post('/api/auth/forgot-password', {
        email: emailState.value,
      });

      // Check if request was successful
      if (res.status !== 200) {
        setSubmitStates((prev) => ({
          ...prev,
          error: 'Something went wrong, please try again later',
        }));
        return setSubmitStates((prev) => ({ ...prev, isSubmitLoading: false }));
      }

      // Set loading state
      setSubmitStates((prev) => ({ ...prev, isSubmitLoading: false }));

      // Set success state
      setSubmitStates((prev) => ({ ...prev, buttonSuccess: true }));

      // Reset form
      setEmailState((prev) => ({ ...prev, value: '' }));
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      setSubmitStates((prev) => ({ ...prev, isSubmitLoading: false }));
      if (!err.response || err.response.status === 500) {
        return setSubmitStates((prev) => ({
          ...prev,
          error: 'Something went wrong, please try again later',
        }));
      } else {
        return setSubmitStates((prev) => ({
          ...prev,
          error: err.response!.data.message,
        }));
      }
    }
  };

  if (submitStates.isSubmitLoading) {
    return <Loader />;
  }

  return (
    <div className=''>
      <form
        className=' max-w-[550px] mx-auto  w-full p-2 mt-6'
        onSubmit={onSubmit}
        autoComplete='off'
        tabIndex={0}
      >
        <div className=''>
          <div>
            <h1 className=' text-3xl font-bold text-center mt-6'>
              Forgot password
            </h1>
          </div>
          <div className='mt-6'>
            <div
              className={`${
                !submitStates.buttonSuccess && 'hidden'
              } bg-success text-center  py-1.5 rounded-box my-3`}
            >
              <div className='prose max-w-none'>
                <p className='text-black'>
                  If the email you entered matches an account in our system, you
                  will receive an email with instructions on how to reset your
                  password.
                </p>
              </div>
            </div>

            <div>
              <p
                className={`${
                  !submitStates.error && 'hidden'
                } bg-error/50 text-center text-white py-1.5 rounded-box my-3`}
              >
                {submitStates.error}
              </p>
            </div>
            <div className=''>
              <AppInput
                id='email'
                label='Email'
                type='text'
                customStyle='custom-bg-color'
                onChange={(e) =>
                  setEmailState({ value: e.target.value, error: '' })
                }
                value={emailState.value}
                placeholder='Enter your email'
                error={emailState.error}
                InputIcon={<BiUser className='input-icon' />}
                isIcon={true}
                onBlur={onBlurHandler}
              />
            </div>
          </div>
          <div className='mt-6'>
            <AppButton
              id='submit'
              customStyle=''
              type='submit'
              disabled={isButtonDisabled}
              loading={submitStates.isSubmitLoading}
              text='Submit'
              buttonSuccess={submitStates.buttonSuccess}
            />
          </div>
        </div>

        <div>
          {/* <div className='relative mt-6 border-t-[1px] border-gray-300'>
        <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 custom-bg-color px-3 pointer-events-none'>
          <h3 className=' text-lg'>Or</h3>
        </div>
      </div> */}
          <div className='mt-6 w-full flex items-center text-center mx-auto '>
            {/* <GoogleAuth setError={setError} /> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordStates;
