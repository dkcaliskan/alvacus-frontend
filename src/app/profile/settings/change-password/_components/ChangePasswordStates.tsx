'use client';
import React, { useEffect, useMemo, useState, FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';

// Ui & Icons
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';

// Context, Hooks & Utils
import useUser from '@/hooks/auth/useUser';
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import { useAuth } from '@/hooks/auth/useAuth';

// Types
import type { AxiosError } from 'axios';
type StateTypes = {
  value: string;
  error?: string;
};
interface ErrorResponse {
  message: string;
}

const ChangePasswordStates: FunctionComponent = () => {
  const auth = useAuth();
  const router = useRouter();
  const { user, isLoading, mutate } = useUser();

  // Check if user is logged in if not redirect to login page
  useEffect(() => {
    if (!user && !isLoading) {
      return router.push('/login');
    }
  }, [user, isLoading, router]);

  // States
  const [currentPasswordState, setCurrentPasswordState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [newPasswordState, setNewPasswordState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [confirmPasswordState, setConfirmPasswordState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  );
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  // Submit States
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  // Confirm Password blur handler
  const confirmPasswordBlurHandler = () => {
    if (newPasswordState.value !== confirmPasswordState.value) {
      setConfirmPasswordState((prevState) => ({
        ...prevState,
        error: 'Password does not match',
      }));
      setIsPasswordMatch(false);
    } else {
      setConfirmPasswordState((prevState) => ({
        ...prevState,
        error: '',
      }));
      setIsPasswordMatch(true);
    }
  };

  // Check if all fields are valid and enable submit button
  const isButtonDisabled = useMemo(() => {
    const isPasswordMatch =
      newPasswordState.value === confirmPasswordState.value;

    const isPasswordValid =
      currentPasswordState.value.length >= 6 && !currentPasswordState.error
        ? true
        : false;
    const isCurrentPasswordValid =
      newPasswordState.value.length >= 6 && !newPasswordState.error
        ? true
        : false;
    const isConfirmPasswordValid =
      confirmPasswordState.value.length >= 6 && !confirmPasswordState.error
        ? true
        : false;

    return (
      isPasswordMatch &&
      isPasswordValid &&
      isCurrentPasswordValid &&
      isConfirmPasswordValid
    );
    // !DON'T REMOVE THE COMMENT BELOW
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPasswordMatch,
    currentPasswordState.value,
    newPasswordState.value,
    confirmPasswordState.value,
    currentPasswordState.error,
    newPasswordState.error,
    confirmPasswordState.error,
  ]);

  // Submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error
    setIsError(false);

    // Check if all fields are valid
    if (!isButtonDisabled) {
      return;
    }

    // Set loading state
    setIsSubmitLoading(true);

    // Submit request
    try {
      const res = await usePrivateAxios.put(
        `/api/user/change-password/${user.userId}`,
        {
          oldPassword: currentPasswordState.value,
          password: newPasswordState.value,
        }
      );

      // Check if request was successful
      if (res.status !== 200) {
        setIsError('Something went wrong. Please try again later.');
        return setIsSubmitLoading(false);
      }

      // Set success state
      setIsSuccess(true);

      // Reset form
      setCurrentPasswordState({
        value: '',
        error: '',
      });

      setNewPasswordState({
        value: '',
        error: '',
      });

      setConfirmPasswordState({
        value: '',
        error: '',
      });

      // Set loading state
      setIsSubmitLoading(false);

      // Reset success state
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      // Re authenticate user
      const loginRes = await auth.accessLogin?.({
        accessToken: res.data.accessToken as string,
      });

      // Mutate user
      if (loginRes?.success) {
        mutate();
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      setIsSubmitLoading(false);
      if (!err.response || err.response.status === 500) {
        return setIsError('Something went wrong. Please try again later.');
      } else {
        return setIsError(err.response.data.message);
      }
    }
  };

  if (isLoading || isSubmitLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        {isSuccess && (
          <div className='alert alert-success lgMax:rounded-none prose max-w-none lg:my-3'>
            <p>Your profile has been updated successfully.</p>
          </div>
        )}
      </div>
      <div>
        {isError && (
          <div className='alert alert-error lgMax:rounded-none prose max-w-none lg:my-3'>
            <p>{isError}</p>
          </div>
        )}
      </div>
      <div className='lgMax:px-1.5 '>
        <h1 className='mobileMax:text-xl text-2xl lg:text-3xl font-bold line-clamp-1 mb-3'>
          Edit your profile
        </h1>
      </div>
      <form
        className='custom-bg-color lg:rounded-lg  py-3 px-1.5 lg:px-3 w-full'
        autoComplete='off'
        tabIndex={0}
        onSubmit={submitHandler}
      >
        <div className='mt-6'>
          <div>
            <AppInput
              id='current-password'
              label='Current Password'
              type={passwordType}
              onChange={(e) =>
                setCurrentPasswordState({
                  value: e.target.value,
                  error: '',
                })
              }
              value={currentPasswordState.value}
              placeholder='Enter current password'
              error={currentPasswordState.error}
              InputIcon={<RiLockPasswordLine className='input-icon' />}
              isIcon={true}
              passwordErrorIconStyle='right-9'
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
              onBlur={(e) => {
                if (e.target.value === '') {
                  setCurrentPasswordState({
                    value: e.target.value,
                    error: 'Please enter your current password',
                  });
                } else if (e.target.value.length < 6) {
                  setCurrentPasswordState({
                    value: e.target.value,
                    error: 'Password must be at least 6 characters',
                  });
                }
              }}
            />
          </div>
          <div className='mt-1.5'>
            <AppInput
              id='new-password'
              label='New Password'
              type={passwordType}
              onChange={(e) =>
                setNewPasswordState({
                  value: e.target.value,
                  error: '',
                })
              }
              value={newPasswordState.value}
              placeholder='Enter new password'
              error={newPasswordState.error}
              InputIcon={<RiLockPasswordLine className='input-icon' />}
              isIcon={true}
              passwordErrorIconStyle='right-9'
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
              onBlur={(e) => {
                if (e.target.value === '') {
                  setNewPasswordState({
                    value: e.target.value,
                    error: 'Please enter your new password',
                  });
                } else if (e.target.value.length < 6) {
                  setNewPasswordState({
                    value: e.target.value,
                    error: 'Password must be at least 6 characters',
                  });
                }
              }}
            />
          </div>

          <div className='mt-1.5'>
            <AppInput
              id='confirm-password'
              label='Confirm Password'
              type={passwordType}
              onChange={(e) =>
                setConfirmPasswordState({
                  value: e.target.value,
                  error: '',
                })
              }
              value={confirmPasswordState.value}
              placeholder='Confirm new password'
              error={confirmPasswordState.error}
              InputIcon={<RiLockPasswordLine className='input-icon' />}
              isIcon={true}
              passwordErrorIconStyle='right-9'
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
              onBlur={confirmPasswordBlurHandler}
            />
          </div>

          <div className='mt-6'>
            <AppButton
              id='profile-submit'
              customStyle=''
              type='submit'
              disabled={!isButtonDisabled}
              loading={isSubmitLoading}
              text='Save changes'
              buttonSuccess={isSuccess}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordStates;
