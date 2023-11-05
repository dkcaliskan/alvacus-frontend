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
import InputLabels from '../../../_components/InputLabels';
import FormulaInput from '../../../_components/Formula';
import Description from '../../../_components/Description';
import InfoInput from '../../../_components/Info';
import UnitSelect from '../../../_components/UnitSelect';
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
  baseFormula: string;
  baseFormulaVariables: string[];
  baseTitle: string;
  baseCategory: string;
  baseDescription: string;
  baseInfo: string;
  baseIsInfoMarkdown: boolean;
  baseLabels: ModularInputLabelsTypes;
  baseSelects: ModularSelectTypes;
  authorId: string;
};

const EditInputs: FunctionComponent<EditInputsTypes> = ({
  baseFormula,
  baseFormulaVariables,
  baseTitle,
  baseCategory,
  baseDescription,
  baseInfo,
  baseIsInfoMarkdown,
  baseLabels,
  baseSelects,
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
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState<string | boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  // Formula states
  const [formulaStates, setFormulaStates] = useState<FormulaStatesTypes>({
    value: baseFormula,
    variables:
      baseFormulaVariables.length > 0
        ? baseFormulaVariables
        : baseFormula
        ? Array.from(new Set(baseFormula.match(/\b[a-zA-Z]\b/g)))
        : [],
    error: '',
  });

  // Input label states
  const [inputLabelStates, setInputLabelStates] = useState({
    inputOne: {
      value: baseLabels.inputOneLabel,
      error: '',
    },
    inputTwo: {
      value: baseLabels.inputTwoLabel,
      error: '',
    },
    inputThree: {
      value: baseLabels.inputThreeLabel,
      error: '',
    },
    inputFour: {
      value: baseLabels.inputFourLabel,
      error: '',
    },
    inputFive: {
      value: baseLabels.inputFiveLabel,
      error: '',
    },
    inputSix: {
      value: baseLabels.inputSixLabel,
      error: '',
    },
    output: {
      value: baseLabels.outputLabel,
      error: '',
    },
  });

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

  // Unit states
  const [baseUnitStates, setBaseUnitStates] = useState<SelectUnitTypes>({
    isUnitSelect: baseSelects.isUnitSelect || false,
    inputOneSelect: baseSelects.inputOneSelect || false,
    inputOneBaseUnit: {
      value: baseSelects.inputOneBaseUnit?.value || '',
      label: baseSelects.inputOneBaseUnit?.label || '',
      category: baseSelects.inputOneBaseUnit?.category || '',
    },
    inputTwoSelect: baseSelects.inputTwoSelect || false,
    inputTwoBaseUnit: {
      value: baseSelects.inputTwoBaseUnit?.value || '',
      label: baseSelects.inputTwoBaseUnit?.label || '',
      category: baseSelects.inputTwoBaseUnit?.category || '',
    },
    inputThreeSelect: baseSelects.inputThreeSelect || false,
    inputThreeBaseUnit: {
      value: baseSelects.inputThreeBaseUnit?.value || '',
      label: baseSelects.inputThreeBaseUnit?.label || '',
      category: baseSelects.inputThreeBaseUnit?.category || '',
    },
    inputFourSelect: baseSelects.inputFourSelect || false,
    inputFourBaseUnit: {
      value: baseSelects.inputFourBaseUnit?.value || '',
      label: baseSelects.inputFourBaseUnit?.label || '',
      category: baseSelects.inputFourBaseUnit?.category || '',
    },
    inputFiveSelect: baseSelects.inputFiveSelect || false,
    inputFiveBaseUnit: {
      value: baseSelects.inputFiveBaseUnit?.value || '',
      label: baseSelects.inputFiveBaseUnit?.label || '',
      category: baseSelects.inputFiveBaseUnit?.category || '',
    },
    inputSixSelect: baseSelects.inputSixSelect || false,
    inputSixBaseUnit: {
      value: baseSelects.inputSixBaseUnit?.value || '',
      label: baseSelects.inputSixBaseUnit?.label || '',
      category: baseSelects.inputSixBaseUnit?.category || '',
    },
    outputSelect: baseSelects.outputSelect || false,
    outputBaseUnit: {
      value: baseSelects.outputBaseUnit?.value || '',
      label: baseSelects.outputBaseUnit?.label || '',
      category: baseSelects.outputBaseUnit?.category || '',
    },
  });

  const [inputOneSelectedUnits, setInputOneSelectedUnits] = useState<
    SelectTypes[]
  >(baseSelects.inputOneSelectedUnits || []);
  const [inputTwoSelectedUnits, setInputTwoSelectedUnits] = useState(
    baseSelects.inputTwoSelectedUnits || []
  );
  const [inputThreeSelectedUnits, setInputThreeSelectedUnits] = useState<
    SelectTypes[]
  >(baseSelects.inputThreeSelectedUnits || []);
  const [inputFourSelectedUnits, setInputFourSelectedUnits] = useState<
    SelectTypes[]
  >(baseSelects.inputFourSelectedUnits || []);
  const [inputFiveSelectedUnits, setInputFiveSelectedUnits] = useState<
    SelectTypes[]
  >(baseSelects.inputFiveSelectedUnits || []);
  const [inputSixSelectedUnits, setInputSixSelectedUnits] = useState<
    SelectTypes[]
  >(baseSelects.inputSixSelectedUnits || []);
  const [outputSelectedUnits, setOutputSelectedUnits] = useState<SelectTypes[]>(
    baseSelects.outputSelectedUnits || []
  );

  // Check if any input is changed
  const isAllValid = useMemo(() => {
    const isFormulaValid =
      formulaStates.value !== baseFormula && formulaStates.value !== '';
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

    // Check if any input label is changed
    const isInputOneValid =
      inputLabelStates.inputOne.value !== baseLabels.inputOneLabel &&
      inputLabelStates.inputOne.value !== '';
    const isInputTwoValid =
      inputLabelStates.inputTwo.value !== baseLabels.inputTwoLabel &&
      inputLabelStates.inputTwo.value !== '';
    const isInputThreeValid =
      inputLabelStates.inputThree.value !== baseLabels.inputThreeLabel &&
      inputLabelStates.inputThree.value !== '';
    const isInputFourValid =
      inputLabelStates.inputFour.value !== baseLabels.inputFourLabel &&
      inputLabelStates.inputFour.value !== '';
    const isInputFiveValid =
      inputLabelStates.inputFive.value !== baseLabels.inputFiveLabel &&
      inputLabelStates.inputFive.value !== '';
    const isInputSixValid =
      inputLabelStates.inputSix.value !== baseLabels.inputSixLabel &&
      inputLabelStates.inputSix.value !== '';
    const isOutputLabelValid =
      inputLabelStates.output.value !== baseLabels.outputLabel &&
      inputLabelStates.output.value !== '';

    // Check if any input select is changed
    const inputOneSelectChanged =
      baseUnitStates.inputOneSelect !== baseSelects.inputOneSelect;
    const inputTwoSelectChanged =
      baseUnitStates.inputTwoSelect !== baseSelects.inputTwoSelect;
    const inputThreeSelectChanged =
      baseUnitStates.inputThreeSelect !== baseSelects.inputThreeSelect;
    const inputFourSelectChanged =
      baseUnitStates.inputFourSelect !== baseSelects.inputFourSelect;
    const inputFiveSelectChanged =
      baseUnitStates.inputFiveSelect !== baseSelects.inputFiveSelect;
    const inputSixSelectChanged =
      baseUnitStates.inputSixSelect !== baseSelects.inputSixSelect;
    const outputSelectChanged =
      baseUnitStates.outputSelect !== baseSelects.outputSelect;

    // Check if any input selected units is changed
    const inputOneSelectedUnitsChanged =
      inputOneSelectedUnits !== baseSelects.inputOneSelectedUnits;
    const inputTwoSelectedUnitsChanged =
      inputTwoSelectedUnits !== baseSelects.inputTwoSelectedUnits;
    const inputThreeSelectedUnitsChanged =
      inputThreeSelectedUnits !== baseSelects.inputThreeSelectedUnits;
    const inputFourSelectedUnitsChanged =
      inputFourSelectedUnits !== baseSelects.inputFourSelectedUnits;
    const inputFiveSelectedUnitsChanged =
      inputFiveSelectedUnits !== baseSelects.inputFiveSelectedUnits;
    const inputSixSelectedUnitsChanged =
      inputSixSelectedUnits !== baseSelects.inputSixSelectedUnits;
    const outputSelectedUnitsChanged =
      outputSelectedUnits !== baseSelects.outputSelectedUnits;

    return (
      isFormulaValid ||
      isTitleValid ||
      isDescriptionValid ||
      isInfoChanged ||
      isCategoryValid ||
      isOutputLabelValid ||
      isInputOneValid ||
      isInputTwoValid ||
      isInputThreeValid ||
      isInputFourValid ||
      isInputFiveValid ||
      isInputSixValid ||
      inputOneSelectChanged ||
      inputTwoSelectChanged ||
      inputThreeSelectChanged ||
      inputFourSelectChanged ||
      inputFiveSelectChanged ||
      inputSixSelectChanged ||
      outputSelectChanged ||
      inputOneSelectedUnitsChanged ||
      inputTwoSelectedUnitsChanged ||
      inputThreeSelectedUnitsChanged ||
      inputFourSelectedUnitsChanged ||
      inputFiveSelectedUnitsChanged ||
      inputSixSelectedUnitsChanged ||
      outputSelectedUnitsChanged
    );
  }, [
    formulaStates,
    title,
    descriptionStates,
    infoStates,
    category,
    inputLabelStates,
    baseFormula,
    baseTitle,
    baseDescription,
    baseInfo,
    baseCategory,
    baseLabels,
    baseSelects,
    baseIsInfoMarkdown,
    baseUnitStates,
    inputOneSelectedUnits,
    inputTwoSelectedUnits,
    inputThreeSelectedUnits,
    inputFourSelectedUnits,
    inputFiveSelectedUnits,
    inputSixSelectedUnits,
    outputSelectedUnits,
  ]);

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
      // Input labels
      const inputLabels = Object.fromEntries(
        Object.entries(inputLabelStates).map(([key, value]) => [
          `${key}Label`,
          value.value,
        ])
      );

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
              buttonSuccess={isEditSuccess}
              loading={isEditLoading ? true : false}
              text={`Submit`}
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
              inputSelects={baseUnitStates}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditInputs;
