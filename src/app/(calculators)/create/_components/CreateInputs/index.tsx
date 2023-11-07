'use client';
// Api & Core
import React, { useState, FunctionComponent, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import Loader from '@/components/Shared/UiElements/Loader';
import InputLabels from './InputLabels';
import FormulaInput from './Formula';
import Description from './Description';
import InfoInput from './Info';
import UnitSelect from './UnitSelect';
import Preview from '@/app/(calculators)/_components/Preview';

// Hooks
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';
import useUser from '@/hooks/auth/useUser';

// Types
import type {
  SelectTypes,
  SelectUnitTypes,
  FormulaStatesTypes,
} from '@/types/create-calculator.d';
import type { AxiosError } from 'axios';
interface ErrorResponse {
  message: string;
}

const CreateInputs: FunctionComponent = () => {
  const router = useRouter();

  // Refs
  const previewRef = useRef<null | HTMLDivElement>(null);
  const errorRef = useRef<null | HTMLDivElement>(null);

  // Hooks
  const { user, isLoading } = useUser();

  // States
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState<string | boolean>(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  // Formula states
  const [formulaStates, setFormulaStates] = useState<FormulaStatesTypes>({
    value: '',
    variables: [],
    error: '',
  });

  // Input label states
  const [inputLabelStates, setInputLabelStates] = useState({
    inputOne: {
      value: '',
      error: '',
    },
    inputTwo: {
      value: '',
      error: '',
    },
    inputThree: {
      value: '',
      error: '',
    },
    inputFour: {
      value: '',
      error: '',
    },
    inputFive: {
      value: '',
      error: '',
    },
    inputSix: {
      value: '',
      error: '',
    },
    output: {
      value: '',
      error: '',
    },
  });

  // Description states
  const [descriptionStates, setDescriptionStates] = useState({
    value: '',
    error: '',
  });

  // Info states
  const [infoStates, setInfoStates] = useState({
    value: '',
    isMarkdown: true,
    error: '',
  });

  // Title states
  const [title, setTitle] = useState({
    value: '',
    error: '',
  });

  // Category states
  const [category, setCategory] = useState('other');

  // Unit states
  const [baseUnitStates, setBaseUnitStates] = useState<SelectUnitTypes>({
    isUnitSelect: false,
    inputOneSelect: false,
    inputOneBaseUnit: {
      value: '',
      label: '',
      category: '',
    },
    inputTwoSelect: false,
    inputTwoBaseUnit: {
      value: '',
      label: '',
      category: '',
    },
    inputThreeSelect: false,
    inputThreeBaseUnit: {
      value: '',
      label: '',
      category: '',
    },
    inputFourSelect: false,
    inputFourBaseUnit: {
      value: '',
      label: '',
      category: '',
    },
    inputFiveSelect: false,
    inputFiveBaseUnit: {
      value: '',
      label: '',
      category: '',
    },
    inputSixSelect: false,
    inputSixBaseUnit: {
      value: '',
      label: '',
      category: '',
    },
    outputSelect: false,
    outputBaseUnit: {
      value: '',
      label: '',
      category: '',
    },
  });
  const [inputOneSelectedUnits, setInputOneSelectedUnits] = useState<
    SelectTypes[]
  >([]);
  const [inputTwoSelectedUnits, setInputTwoSelectedUnits] = useState<
    SelectTypes[]
  >([]);
  const [inputThreeSelectedUnits, setInputThreeSelectedUnits] = useState<
    SelectTypes[]
  >([]);
  const [inputFourSelectedUnits, setInputFourSelectedUnits] = useState<
    SelectTypes[]
  >([]);
  const [inputFiveSelectedUnits, setInputFiveSelectedUnits] = useState<
    SelectTypes[]
  >([]);
  const [inputSixSelectedUnits, setInputSixSelectedUnits] = useState<
    SelectTypes[]
  >([]);
  const [outputSelectedUnits, setOutputSelectedUnits] = useState<SelectTypes[]>(
    []
  );

  // Check if all inputs are valid
  const isAllValid = useMemo(() => {
    if (
      title.value &&
      formulaStates.value &&
      inputLabelStates.output.value &&
      infoStates.value &&
      descriptionStates.value &&
      formulaStates.variables.length > 0
    ) {
      return true;
    }
    return false;
  }, [title, formulaStates, inputLabelStates, infoStates, descriptionStates]);

  // Get input selected units function
  const getInputSelectedUnits = (inputNumber: string) => {
    switch (inputNumber) {
      case 'One':
        return inputOneSelectedUnits;
      case 'Two':
        return inputTwoSelectedUnits;
      case 'Three':
        return inputThreeSelectedUnits;
      case 'Four':
        return inputFourSelectedUnits;
      case 'Five':
        return inputFiveSelectedUnits;
      case 'Six':
        return inputSixSelectedUnits;
      default:
        return [];
    }
  };

  // Input selected units
  const inputSelectedUnits = {
    isUnitSelect: baseUnitStates.isUnitSelect,
    ...Object.fromEntries(
      Object.entries(baseUnitStates).flatMap(([key, value]) => {
        if (key.includes('input')) {
          const selectedUnitKey = `${key
            .replace('Select', '')
            .replace('BaseUnit', '')}SelectedUnits`;

          const inputNumber = key
            .replace('Select', '')
            .replace('input', '')
            .replace('BaseUnit', '');

          return [
            // Return InputSelect boolean and InputBaseUnit
            [key, value],

            // Return InputSelectedUnits
            [selectedUnitKey, getInputSelectedUnits(inputNumber)],
          ];
        }
        return [];
      })
    ),
    outputSelect: baseUnitStates.outputSelect,
    outputBaseUnit: baseUnitStates.outputBaseUnit,
    outputSelectedUnits: outputSelectedUnits,
  };

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

    setIsCreateLoading(true);

    try {
      // Input labels
      const inputLabels = Object.fromEntries(
        Object.entries(inputLabelStates).map(([key, value]) => [
          `${key}Label`,
          value.value,
        ])
      );

      // Request body
      const body = {
        userId: user.userId,
        title: title.value,
        category: category,
        formula: formulaStates.value,
        formulaVariables: formulaStates.variables,
        description: descriptionStates.value,
        info: infoStates.value,
        isInfoMarkdown: infoStates.isMarkdown,
        inputLength: formulaStates.variables.length,
        inputLabels: inputLabels,
        inputSelects: inputSelectedUnits,
      };

      // Create calculator
      const res = await usePrivateAxios.post('/api/calculators/create', body);

      // If success
      if (res.status === 200) {
        setIsCreateLoading(false);
        setIsCreateSuccess(true);

        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push(`${res.data.link}`);
      }
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      setIsCreateLoading(false);
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
        <div>
          <FormulaInput
            formulaStates={formulaStates}
            setFormulaStates={setFormulaStates}
          />
        </div>

        <div className='mt-3'>
          <AppInput
            id='outputLabel'
            name='output-label'
            label={`Output label`}
            type='text'
            placeholder={`Enter a label for output`}
            value={inputLabelStates.output.value}
            onChange={(e) =>
              setInputLabelStates({
                ...inputLabelStates,
                output: {
                  value: e.target.value,
                  error: '',
                },
              })
            }
            error={inputLabelStates.output.error}
            onBlur={(e) => {
              if (!e.target.value) {
                setInputLabelStates({
                  ...inputLabelStates,
                  output: {
                    ...inputLabelStates.output,
                    error: 'Output label is required',
                  },
                });
              }
            }}
          />
        </div>

        <div>
          <InputLabels
            formulaVariables={formulaStates.variables}
            labelStates={inputLabelStates}
            setLabelStates={setInputLabelStates}
          />
        </div>

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

        <div className='mt-3'>
          <UnitSelect
            formulaVariables={formulaStates.variables}
            baseUnitStates={baseUnitStates}
            setBaseUnitStates={setBaseUnitStates}
            inputOneSelectedUnits={inputOneSelectedUnits}
            setInputOneSelectedUnits={setInputOneSelectedUnits}
            inputTwoSelectedUnits={inputTwoSelectedUnits}
            setInputTwoSelectedUnits={setInputTwoSelectedUnits}
            inputThreeSelectedUnits={inputThreeSelectedUnits}
            setInputThreeSelectedUnits={setInputThreeSelectedUnits}
            inputFourSelectedUnits={inputFourSelectedUnits}
            setInputFourSelectedUnits={setInputFourSelectedUnits}
            inputFiveSelectedUnits={inputFiveSelectedUnits}
            setInputFiveSelectedUnits={setInputFiveSelectedUnits}
            inputSixSelectedUnits={inputSixSelectedUnits}
            setInputSixSelectedUnits={setInputSixSelectedUnits}
            outputSelectedUnits={outputSelectedUnits}
            setOutputSelectedUnits={setOutputSelectedUnits}
          />
        </div>
        <div className='grid grid-cols-2 gap-6 mt-9'>
          {user && !isLoading ? (
            <AppButton
              id='create-calculator-submit'
              disabled={isAllValid ? false : true}
              type='submit'
              buttonSuccess={isCreateSuccess}
              loading={isCreateLoading ? true : false}
              text={`Create`}
              successText='Redirecting...'
            />
          ) : (
            <div className='btn btn-outline btn-active pointer-events-none'>
              <span>Please login to save</span>
            </div>
          )}

          <div>
            <AppButton
              id='preview-calculator-submit'
              customStyle='btn-outline btn-secondary'
              disabled={formulaStates.variables.length === 0 ? true : false}
              type='button'
              loading={false}
              text={`${isPreview ? 'Close Formula test' : 'Test Formula'}`}
              onClick={() => setIsPreview(!isPreview)}
            />
          </div>
        </div>
      </form>
      <div>
        {isPreview && (
          <div ref={previewRef}>
            <Preview
              formula={formulaStates.value}
              formulaLength={formulaStates.variables.length}
              inputOneLabel={inputLabelStates.inputOne.value}
              inputTwoLabel={inputLabelStates.inputTwo.value}
              inputThreeLabel={inputLabelStates.inputThree.value}
              inputFourLabel={inputLabelStates.inputFour.value}
              inputFiveLabel={inputLabelStates.inputFive.value}
              inputSixLabel={inputLabelStates.inputSix.value}
              outputLabel={inputLabelStates.output.value}
              inputSelects={inputSelectedUnits}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateInputs;
