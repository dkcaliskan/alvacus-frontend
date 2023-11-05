'use client';
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
  FunctionComponent,
} from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Ui & Icons
import { BiUser } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { CgWorkAlt } from 'react-icons/cg';
import { HiOutlineBuildingLibrary } from 'react-icons/hi2';

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

const AccountStates: FunctionComponent = () => {
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
  const [usernameState, setUsernameState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [emailState, setEmailState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [professionState, setProfessionState] = useState<StateTypes>({
    value: '',
    error: '',
  });
  const [companyState, setCompanyState] = useState<StateTypes>({
    value: '',
    error: '',
  });

  const [imageSrc, setImageSrc] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean | string>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Check if any of the states are changed
  const isChanged = useMemo(() => {
    return (
      usernameState.value !== user?.username ||
      emailState.value !== user?.email ||
      professionState.value !== user?.profession ||
      companyState.value !== user?.company ||
      imageSrc !== user?.avatar
    );
  }, [
    usernameState.value,
    emailState.value,
    professionState.value,
    companyState.value,
    user,
    imageSrc,
  ]);

  // Watch for user data
  useEffect(() => {
    if (user && !isDataLoaded) {
      setUsernameState({ value: user.username });
      setEmailState({ value: user.email });
      setProfessionState({ value: user.profession ?? '' });
      setCompanyState({ value: user.company ?? '' });
      setImageSrc(user.avatar ?? '');
      setIsDataLoaded(true);
    }

    //! Don't remove this comment eslint disabled because it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, isDataLoaded]);

  // Profile avatar change handler
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Avatar blur url
  const blurredUrl =
    user && user.avatar != undefined
      ? user?.avatar.split('/upload')[0] +
        '/blur:1200' +
        user?.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  // Submit handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rest error states
    setIsError(false);

    // Check if any of the states are changed
    if (!isChanged) {
      return;
    }

    // Check if any error exists
    if (usernameState.error || emailState.error) {
      return;
    }

    // Set loading state
    setIsSubmitLoading(true);

    // Request function
    const requestDB = async (imageUrl: string | null) => {
      try {
        const res = await usePrivateAxios.put(
          `/api/user/edit/${user?.userId}`,
          {
            username: usernameState.value,
            email: emailState.value,
            profession: professionState.value,
            company: companyState.value,
            avatar: imageUrl,
          }
        );
        if (res.status === 200) {
          const loginRes = await auth.accessLogin?.({
            accessToken: res.data.accessToken as string,
          });
          if (loginRes?.success) {
            setIsSuccess(true);
            setIsError(false);
            location.reload();
          }
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

    // Check if image is changed
    if (imageSrc !== user?.avatar) {
      const formData = new FormData();
      formData.append('file', imageSrc);
      formData.append('upload_preset', 'user_picture');

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          formData
        );
        if (res.status === 200) {
          requestDB(res.data.secure_url as string);
        }
      } catch (e) {
        const err = e as AxiosError<ErrorResponse>;
        setIsSubmitLoading(false);
        if (!err.response) {
          return setIsError('Something went wrong. Please try again later.');
        } else {
          return setIsError(err.response.data.message);
        }
      }
    } else {
      requestDB(null);
    }
  };

  if (isSubmitLoading || !isDataLoaded || isLoading) {
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
        onSubmit={onSubmit}
      >
        <div className='mt-6'>
          <div className='grid justify-items-center'>
            <div
              className={`mask mask-squircle avatar bg-base-content h-[120px] w-[120px] bg-opacity-[0.01] p-px`}
            >
              <Image
                src={`${
                  imageSrc ? imageSrc : '/assets/images/profile-placeholder.png'
                }`}
                className='mask mask-squircle'
                width={120}
                height={120}
                alt={`${user?.username} Alvacus profile picture`}
                placeholder='blur'
                blurDataURL={blurredUrl}
              />
            </div>
          </div>

          <div>
            <AppInput
              id='profession'
              label='Profession'
              type='text'
              onChange={(e) =>
                setProfessionState({ value: e.target.value, error: '' })
              }
              value={professionState.value}
              placeholder='Enter your profession'
              error={professionState.error}
              InputIcon={<CgWorkAlt className='input-icon mt-[1px]' />}
              isIcon={true}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setProfessionState({
                    value: '',
                    error: 'Please enter your profession',
                  });
                }
              }}
            />
          </div>
          <div className='mt-1.5'>
            <AppInput
              id='company'
              label={
                professionState.value.toLowerCase() === 'student'
                  ? 'School'
                  : 'Company'
              }
              type='text'
              onChange={(e) =>
                setCompanyState({ value: e.target.value, error: '' })
              }
              value={companyState.value}
              placeholder='Enter your company'
              error={companyState.error}
              InputIcon={<HiOutlineBuildingLibrary className='input-icon' />}
              isIcon={true}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setCompanyState({
                    value: '',
                    error: 'Please enter your company',
                  });
                }
              }}
            />
          </div>

          <div className='mt-1.5'>
            <AppInput
              id='username'
              label='Username'
              type='text'
              onChange={(e) =>
                setUsernameState({ value: e.target.value, error: '' })
              }
              value={usernameState.value}
              placeholder='Enter username'
              error={usernameState.error}
              InputIcon={<BiUser className='input-icon' />}
              isIcon={true}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setUsernameState({
                    value: '',
                    error: 'Please enter your username',
                  });
                }
              }}
            />
          </div>
          <div className='mt-1.5'>
            <AppInput
              id='email'
              label='Email'
              type='email'
              onChange={(e) =>
                setEmailState({ value: e.target.value, error: '' })
              }
              value={emailState.value}
              placeholder='Enter email'
              error={emailState.error}
              InputIcon={<MdOutlineAlternateEmail className='input-icon' />}
              isIcon={true}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setEmailState({
                    value: '',
                    error: 'Please enter your email',
                  });
                }
              }}
            />
          </div>

          <div className='form-control w-full mt-3'>
            <label className='label' htmlFor='profile-picture-change'>
              <span className='label-text'>Change profile picture</span>
            </label>
            <input
              type='file'
              id='profile-picture-change'
              name='profile-picture-change'
              className='file-input file-input-bordered file-input-primary w-full '
              accept='image/*'
              onChange={handleAvatarChange}
            />
          </div>

          <div className='mt-6'>
            <AppButton
              id='profile-submit'
              customStyle=''
              type='submit'
              disabled={!isChanged}
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

export default AccountStates;
