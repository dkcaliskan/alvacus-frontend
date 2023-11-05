'use client';

// Api & Core
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Ui & Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';

// Context, Hooks & Utils
import useUser from '@/hooks/auth/useUser';
import useAxios from '@/hooks/axios/useAxios';

// Types
import type { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const ResetPasswordStates: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { user, isLoading, mutate } = useUser();

  // Get the token from the query params
  const token = params.get('t');
  // Check if user is logged in and redirect to home page if user is already logged in
  useEffect(() => {
    if ((user && !isLoading) || (!token && !isLoading)) {
      router.push('/');
    }
  }, [user, isLoading, router, token]);

  // Password states
  const [passwordState, setPasswordState] = useState<{
    value: string;
    error?: string;
  }>({
    value: '',
    error: '',
  });

  // Confirm password states
  const [confirmPasswordState, setConfirmPasswordState] = useState<{
    value: string;
    error?: string;
  }>({
    value: '',
    error: '',
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  // Password type
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    'password' | 'text'
  >('password');

  // Submit States
  const [submitStates, setSubmitStates] = useState({
    isSubmitLoading: false,
    buttonSuccess: false,
    error: '',
  });

  // Check if all fields are valid and enable submit button
  const isButtonDisabled = useMemo(() => {
    const isPasswordValid =
      passwordState.value.length >= 6 && !passwordState.error ? true : false;

    const isConfirmPasswordValid =
      confirmPasswordState.value.length >= 6 && !confirmPasswordState.error
        ? true
        : false;

    return (
      submitStates.isSubmitLoading ||
      !isPasswordMatch ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    );

    // !DON'T REMOVE THE COMMENT BELOW
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    submitStates.isSubmitLoading,
    passwordState.value,
    confirmPasswordState.value,
    isPasswordMatch,
  ]);

  // Confirm Password blur handler to check if password matches
  const confirmPasswordBlurHandler = () => {
    if (passwordState.value !== confirmPasswordState.value) {
      setConfirmPasswordState((prev) => ({
        ...prev,
        error: 'Passwords do not match',
      }));
      setIsPasswordMatch(false);
    } else {
      setConfirmPasswordState((prev) => ({ ...prev, error: '' }));
      setIsPasswordMatch(true);
    }
  };

  // Blur error handler
  const onBlurHandler = (e: { target: { id: string } }) => {
    switch (e.target.id) {
      case 'password':
        if (!passwordState.value) {
          setPasswordState((prev) => ({
            ...prev,
            error: 'Password is required',
          }));
        }
        if (passwordState.value.length < 6) {
          setPasswordState((prev) => ({
            ...prev,
            error: 'Password must be at least 6 characters',
          }));
        }
        break;
      case 'confirm-password':
        if (!confirmPasswordState.value) {
          setConfirmPasswordState((prev) => ({
            ...prev,
            error: 'Confirm password is required',
          }));
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check isButtonDisabled
    if (isButtonDisabled) {
      return;
    }

    // Reset password error
    setPasswordState((prev) => ({ ...prev, error: '' }));

    // Reset confirm password error
    setConfirmPasswordState((prev) => ({ ...prev, error: '' }));

    // Reset error
    setSubmitStates((prev) => ({ ...prev, error: '' }));

    // Reset success
    setSubmitStates((prev) => ({ ...prev, buttonSuccess: false }));

    // Set loading state
    setSubmitStates((prev) => ({ ...prev, isSubmitLoading: true }));

    try {
      const res = await useAxios.put('/api/auth/reset-password', {
        password: passwordState.value,
        t: token,
      });

      console.log(res);

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
              Reset your password
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
                  Your password has been successfully reset. You can now{' '}
                  <Link href='/login' className='ml-1 link text-black'>
                    Login.
                  </Link>
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
                id='password'
                label='Password'
                type={passwordType}
                onChange={(e) =>
                  setPasswordState({ value: e.target.value, error: '' })
                }
                value={passwordState.value}
                placeholder='Enter password'
                customStyle='custom-bg-color'
                passwordErrorIconStyle='right-9'
                error={passwordState.error}
                InputIcon={<RiLockPasswordLine className='input-icon' />}
                isIcon={true}
                PasswordToggler={
                  <button
                    type='button'
                    className={`absolute right-3 top-[14px] text-[22px] transition ease-in-out`}
                    onClick={() => {
                      setPasswordType(
                        passwordType === 'password' ? 'text' : 'password'
                      );
                    }}
                    aria-label='Toggle password visibility'
                  >
                    {passwordType === 'password' ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                }
                onBlur={onBlurHandler}
              />
            </div>
            <div className='mt-1.5'>
              <AppInput
                id='confirm-password'
                label='Confirm Password'
                type={confirmPasswordType}
                onChange={(e) =>
                  setConfirmPasswordState({ value: e.target.value, error: '' })
                }
                value={confirmPasswordState.value}
                placeholder='Enter confirm password'
                customStyle='custom-bg-color'
                passwordErrorIconStyle='right-9'
                error={confirmPasswordState.error}
                InputIcon={<RiLockPasswordLine className='input-icon' />}
                isIcon={true}
                PasswordToggler={
                  <button
                    type='button'
                    className={`absolute right-3 top-[14px] text-[22px] transition ease-in-out`}
                    onClick={() => {
                      setConfirmPasswordType(
                        confirmPasswordType === 'password' ? 'text' : 'password'
                      );
                    }}
                    aria-label='Toggle confirm password visibility'
                  >
                    {confirmPasswordType === 'password' ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                }
                onBlur={confirmPasswordBlurHandler}
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

export default ResetPasswordStates;
