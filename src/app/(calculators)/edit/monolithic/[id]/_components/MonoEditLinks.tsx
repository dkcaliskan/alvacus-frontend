'use client';
// Api & Core
import React, {
  useState,
  FunctionComponent,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { useRouter, useParams } from 'next/navigation';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';
import Description from '../../../_components/Description';
import InfoInput from '../../../_components/Info';
import Preview from '@/app/(calculators)/_components/Preview';

// Hooks
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import useUser from '@/hooks/auth/useUser';

// Types
import type { AxiosError } from 'axios';
import type {
  ModularInputLabelsTypes,
  ModularSelectTypes,
} from '@/types/calculators.d';

import type {
  SelectTypes,
  SelectUnitTypes,
  FormulaStatesTypes,
} from '@/types/create-calculator.d';

interface ErrorResponse {
  message: string;
}

type EditInputsTypes = {
  baseTitle: string;
  baseCategory: string;
  baseDescription: string;
  baseInfo: string;
  baseIsInfoMarkdown: boolean;
  authorId: string;
};

const MonoEditInputs: FunctionComponent<EditInputsTypes> = ({
  baseTitle,
  baseCategory,
  baseDescription,
  baseInfo,
  baseIsInfoMarkdown,
  authorId,
}) => {
  const router = useRouter();
  const { id } = useParams();

  // Hooks
  const { user, isLoading } = useUser();

  // Check if user is logged in and is the author of the calculator
  useEffect(() => {
    if (!user && !isLoading) {
      router.push(`/calculators/${id}`);
    } else if (
      user &&
      !isLoading &&
      (user.userId !== authorId || user.role !== 'admin')
    ) {
      router.push(`/calculators/${id}`);
    }
  }, [user, isLoading, authorId, id, router]);

  // Refs
  const previewRef = useRef<null | HTMLDivElement>(null);
  const errorRef = useRef<null | HTMLDivElement>(null);

  // States
  const [isSubmitError, setIsSubmitError] = useState<string | boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  // Description states
  const [descriptionStates, setDescriptionStates] = useState({
    value: baseDescription,
    error: '',
  });

  // Info states
  const [infoStates, setInfoStates] = useState({
    value: baseInfo,
    isMarkdown: baseIsInfoMarkdown,
    error: '',
  });

  // Title states
  const [title, setTitle] = useState({
    value: baseTitle,
    error: '',
  });

  // Category states
  const [category, setCategory] = useState(baseCategory);

  // Check if any input is changed
  const isAllValid = useMemo(() => {
    const isTitleValid = title.value !== baseTitle && title.value !== '';
    const isDescriptionValid =
      descriptionStates.value !== baseDescription &&
      descriptionStates.value !== '';
    const isInfoValid =
      infoStates.value !== baseInfo && infoStates.value !== '';
    const isInfoMarkdownValid =
      infoStates.isMarkdown !== baseIsInfoMarkdown && infoStates.value !== '';
    const isInfoChanged = isInfoValid || isInfoMarkdownValid;
    const isCategoryValid = category !== baseCategory;

    return (
      isTitleValid || isDescriptionValid || isInfoChanged || isCategoryValid
    );
  }, [
    title,
    descriptionStates,
    infoStates,
    category,
    baseTitle,
    baseDescription,
    baseInfo,
    baseCategory,
    baseIsInfoMarkdown,
  ]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all inputs are valid
    if (!isAllValid) {
      return setIsSubmitError('All inputs are required');
    }

    // Check if user is logged in
    if (!user) {
      return setIsSubmitError('You need to be logged in to create a formula');
    }

    setIsEditLoading(true);

    try {
      // Request body
      const body = {
        userId: user.userId,
        title: title.value,
        category: category,
        description: descriptionStates.value,
        info: infoStates.value,
        isInfoMarkdown: infoStates.isMarkdown,
        inputLength: 0,
      };

      // Create calculator
      const res = await usePrivateAxios.patch(
        `/api/calculators/edit/${id}`,
        body
      );

      // If success
      if (res.status === 200) {
        setIsEditLoading(false);
        setIsEditSuccess(true);

        // Revalidate data
        router.refresh();

        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push(`${res.data.link}`);
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      setIsEditLoading(false);
      if (!err.response) {
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        return setIsSubmitError('Something went wrong');
      } else {
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        return setIsSubmitError(err.response.data.message);
      }
    }
  };

  if (!user && isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div>
        {!user && !isLoading && (
          <div className='alert alert-warning lgMax:rounded-none mt-3'>
            <span>
              Please log in to save your calculator, but feel free to use the
              &apos;Test Formula&apos; button to preview your current formula
              without logging in.
            </span>
          </div>
        )}
      </div>
      <form
        autoComplete='off'
        onSubmit={onSubmit}
        tabIndex={0}
        className='custom-bg-color  pt-3 pb-6 px-1.5 lg:px-3  rounded-lg lg:rounded-box mt-3'
      >
        <section ref={errorRef}>
          {isSubmitError && (
            <div className=' bg-error/10 py-3 rounded-lg px-3'>
              <p>{isSubmitError}.</p>
            </div>
          )}
        </section>

        <div className='mt-3 grid lg:grid-cols-2 gap-3'>
          <div className=' w-full'>
            <AppInput
              id='title'
              name='title'
              label='Title'
              placeholder='Title of your formula'
              value={title.value}
              onChange={(e) => setTitle({ value: e.target.value, error: '' })}
              error={title.error}
              onBlur={(e) => {
                if (!e.target.value) {
                  setTitle({
                    ...title,
                    error: 'Title is required',
                  });
                }
              }}
            />
          </div>
          <div className='form-control  w-full'>
            <label className='label' htmlFor='category-select'>
              <span className='label-text'>Select a category</span>
            </label>
            <select
              className='select select-bordered golden-select-safe focus:outline-offset-0'
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              id='category-select'
              name='category-select'
            >
              <option value='chemistry'>Chemistry</option>
              <option value='conversion'>Conversion</option>
              <option value='engineering'>Engineering</option>
              <option value='finance'>Finance</option>
              <option value='geometry'>Geometry</option>
              <option value='mathematic'>Mathematic</option>
              <option value='medical'>Medical</option>
              <option value='physics'>Physics</option>
              <option value='other'>Other</option>
            </select>
          </div>
        </div>

        <div className='mt-3'>
          <Description
            descriptionStates={descriptionStates}
            setDescriptionStates={setDescriptionStates}
          />
        </div>

        <div className='mt-3'>
          <InfoInput infoStates={infoStates} setInfoStates={setInfoStates} />
        </div>

        <div className='grid grid-cols-2 gap-6 mt-9'>
          {user && !isLoading ? (
            <AppButton
              id='create-calculator-submit'
              disabled={isAllValid ? false : true}
              type='submit'
              buttonSuccess={isEditSuccess}
              loading={isEditLoading ? true : false}
              text={`Submit`}
            />
          ) : (
            <div className='btn btn-outline btn-active pointer-events-none'>
              <span>Please login to save</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MonoEditInputs;
