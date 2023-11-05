'use client';

// Api & Core
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Ui & Icons
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';

// Dynamic imports
const GoogleAuth = dynamic(() => import('../../_components/GoogleAuth'), {
  ssr: false,
});

// Context, Hooks & Utils
import useUser from '@/hooks/auth/useUser';
import useAxios from '@/hooks/axios/useAxios';

// Types
import type { AxiosError } from 'axios';
import { useAuth } from '@/hooks/auth/useAuth';
type StateTypes = {
  value: string;
  error?: string;
};
interface ErrorResponse {
  message: string;
}

const RegisterStates: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const auth = useAuth();
  const { user, isLoading, mutate } = useUser();

  // Check if user is logged in and redirect to home page if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  // Username states
  const [usernameState, setUsernameState] = useState<StateTypes>({
    value: '',
    error: '',
  });

  // Email states
  const [emailState, setEmailState] = useState<StateTypes>({
    value: '',
    error: '',
  });

  // Password states
  const [passwordState, setPasswordState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [confirmPasswordState, setConfirmPasswordState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
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

  // Google auth error state
  const [googleAuthError, setGoogleAuthError] = useState('');

  // Check if all fields are valid and enable submit button
  const isButtonDisabled = useMemo(() => {
    const isPasswordValid =
      passwordState.value.length >= 6 && !passwordState.error ? true : false;

    const isEmailValid =
      emailState.value.length > 0 && !emailState.error ? true : false;

    const isUsernameValid =
      usernameState.value.length > 0 && !usernameState.error ? true : false;

    const isConfirmPasswordValid =
      confirmPasswordState.value.length >= 6 && !confirmPasswordState.error
        ? true
        : false;

    return (
      isPasswordMatch &&
      isPasswordValid &&
      isEmailValid &&
      isUsernameValid &&
      isConfirmPasswordValid
    );
  }, [
    isPasswordMatch,
    passwordState.value,
    passwordState.error,
    emailState.value,
    emailState.error,
    usernameState.value,
    usernameState.error,
    confirmPasswordState.value,
    confirmPasswordState.error,
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
      case 'username':
        if (!usernameState.value) {
          setUsernameState((prev) => ({
            ...prev,
            error: 'Username is required',
          }));
        }
        break;
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

    // Reset error
    setSubmitStates((prev) => ({ ...prev, error: '' }));

    // Check if the input fields are valid
    if (!isButtonDisabled) {
      return;
    }

    // Set loading state
    setSubmitStates((prev) => ({ ...prev, isSubmitLoading: true }));

    try {
      const res = await useAxios.post('/api/auth/register', {
        username: usernameState.value,
        email: emailState.value,
        password: passwordState.value,
      });

      // Send login request
      const loginRes = await auth.accessLogin?.({
        accessToken: res.data.accessToken as string,
      });

      // Check if login request is successful
      if (loginRes?.success) {
        // Set success state
        setSubmitStates((prev) => ({
          ...prev,
          isSubmitLoading: false,
          buttonSuccess: true,
        }));

        // Mutate user
        mutate();

        // Redirect to home page
        router.push('/');
      } else {
        // Set error state
        setSubmitStates((prev) => ({
          ...prev,
          isSubmitLoading: false,
          error: loginRes?.error as string,
        }));
      }
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;

      // Set error state
      setSubmitStates((prev) => ({
        ...prev,
        isSubmitLoading: false,
        error: String(error?.response?.data?.message),
      }));
    }
  };
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
            <h1 className=' text-3xl font-bold text-center mt-6'>Register</h1>
          </div>
          <div className='mt-6'>
            <div>
              <p
                className={`${
                  (!submitStates.error || googleAuthError) && 'hidden'
                } bg-error/50 text-center text-white py-1.5 rounded-box my-3`}
              >
                {submitStates.error || googleAuthError}
              </p>
            </div>
            <div className=''>
              <AppInput
                id='username'
                label='Username'
                type='text'
                customStyle='custom-bg-color'
                onChange={(e) =>
                  setUsernameState({ value: e.target.value, error: '' })
                }
                value={usernameState.value}
                placeholder='Enter username'
                error={usernameState.error}
                InputIcon={<BiUser className='input-icon' />}
                isIcon={true}
                onBlur={onBlurHandler}
              />
            </div>

            <div className='mt-1.5'>
              <AppInput
                id='email'
                label='Email'
                type='email'
                customStyle='custom-bg-color'
                onChange={(e) =>
                  setEmailState({ value: e.target.value, error: '' })
                }
                value={emailState.value}
                placeholder='Enter email'
                error={emailState.error}
                InputIcon={<MdOutlineAlternateEmail className='input-icon' />}
                isIcon={true}
                onBlur={onBlurHandler}
              />
            </div>

            <div className='mt-1.5'>
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
              id='register-submit'
              customStyle=''
              type='submit'
              disabled={!isButtonDisabled}
              loading={submitStates.isSubmitLoading}
              text='Register'
              buttonSuccess={submitStates.buttonSuccess}
            />
          </div>
        </div>

        <div>
          <div className='relative mt-6 border-t-[1px] border-gray-300'>
            <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-100 px-3 pointer-events-none'>
              <h3 className=' text-lg'>Or</h3>
            </div>
          </div>
          <div className='mt-6 w-full flex items-center text-center mx-auto'>
            <GoogleAuth setError={setGoogleAuthError} />
          </div>
        </div>

        <div className='pb-1 pt-6 text-xs text-gray-600'>
          <div>
            By clicking Register, Register with Google or any social login
            button, you agree to our&nbsp;
            <a
              href='/terms&conditions'
              className='underline text-mainColor-400'
            >
              Terms & Conditions
            </a>
            &nbsp;and that you have read our&nbsp;
            <a
              href='/terms&conditions'
              className='underline text-mainColor-400'
            >
              Privacy Policy.
            </a>
          </div>
        </div>
        <div className='pt-6 text-center text-lg'>
          <p>
            Have an account?{' '}
            <Link href={'/login'} className='link link-hover text-primary'>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterStates;
