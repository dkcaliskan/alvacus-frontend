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
import dynamic from 'next/dynamic';

// Ui & Icons
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';

// Dynamic imports
const GoogleAuth = dynamic(() => import('../../_components/GoogleAuth'), {
  ssr: false,
});

// Context, Hooks & Utils
import { AuthContext } from '@/context/authContext';
import useUser from '@/hooks/auth/useUser';

const LoginStates: FunctionComponent = () => {
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

  // Username states
  const [usernameState, setUsernameState] = useState<{
    value: string;
    error?: string;
  }>({
    value: '',
    error: '',
  });

  // Password states
  const [passwordState, setPasswordState] = useState<{
    value: string;
    error?: string;
  }>({
    value: '',
    error: '',
  });
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  );

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
    return (
      submitStates.isSubmitLoading ||
      !usernameState.value ||
      !passwordState.value
    );
  }, [submitStates.isSubmitLoading, usernameState.value, passwordState.value]);

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
      case 'password':
        if (!passwordState.value) {
          setPasswordState((prev) => ({
            ...prev,
            error: 'Password is required',
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

    // Check if username is empty
    if (!usernameState.value) {
      setUsernameState((prev) => ({ ...prev, error: 'Username is required' }));
      return;
    }

    // Check if password is empty
    if (!passwordState.value) {
      setPasswordState((prev) => ({ ...prev, error: 'Password is required' }));
      return;
    }

    // Set loading state
    setSubmitStates((prev) => ({ ...prev, isSubmitLoading: true }));

    // Login request to server and get response
    const loginResponse: {
      success?: boolean;
      error?: string;
    } = await auth.login!({
      username: usernameState.value,
      password: passwordState.value,
    });

    // Check if login request is successful
    if (loginResponse?.success) {
      // Set success state
      setSubmitStates((prev) => ({
        ...prev,
        isSubmitLoading: false,
        buttonSuccess: true,
      }));

      // Mutate user
      mutate();

      // Get the previous path from sessionStorage
      const previousPath = sessionStorage.getItem('previousPath');

      // Wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If the previous path exists and is the same as the current path, go back
      if (previousPath && previousPath === pathname) {
        router.back();
      } else {
        router.push('/');
      }
    }

    // Check if login request is unsuccessful
    if (!loginResponse?.success) {
      // Set error state
      setSubmitStates((prev) => ({
        ...prev,
        isSubmitLoading: false,
        error: loginResponse?.error || 'Something went wrong',
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
            <h1 className=' text-3xl font-bold text-center mt-6'>Login</h1>
          </div>
          <div className='mt-6'>
            <div>
              <p
                className={`${
                  (!submitStates.error || !googleAuthError) && 'hidden'
                } bg-error/50 text-center text-white py-1.5 rounded-box my-3`}
              >
                {submitStates.error || googleAuthError}
              </p>
            </div>
            <div className=''>
              <AppInput
                id='username'
                label='Username or email'
                type='text'
                customStyle='custom-bg-color'
                onChange={(e) =>
                  setUsernameState({ value: e.target.value, error: '' })
                }
                value={usernameState.value}
                placeholder='Enter username or email'
                error={usernameState.error}
                InputIcon={<BiUser className='input-icon' />}
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
            <div className='mt-1.5 text-right '>
              <Link
                href='/forgot-password'
                as='/forgot-password'
                className='link link-hover text-right text-md text-primary'
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className='mt-3'>
            <AppButton
              id='login-submit'
              customStyle=''
              type='submit'
              disabled={isButtonDisabled}
              loading={submitStates.isSubmitLoading}
              text='Login'
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

        <div>
          <div className='pt-3 pb-6 text-center text-lg '>
            <p className=''>
              Don&apos;t have an account?
              <Link
                href='/register'
                as='/register'
                className='link link-hover text-primary pl-1.5 '
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginStates;
