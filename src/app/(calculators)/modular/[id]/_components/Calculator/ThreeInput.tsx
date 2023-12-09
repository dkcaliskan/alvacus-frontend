'use client';

// Api & Core
import React, { FunctionComponent, useState } from 'react';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import AppOutput from '@/components/Shared/Form/AppOutput';
import AppModularSelect from '@/components/Shared/Form/AppModularSelect';

// Utils
import { evaluateFormula } from '@/utils/calculate';

// Types
import type {
  ModularInputLabelsTypes,
  ModularSelectTypes,
} from '@/types/calculators.d';
import { inputConversion } from '@/utils/converter/inputConversion';

type ThreeInputTypes = {
  formula: string;
  inputLabels: ModularInputLabelsTypes;
  inputSelects: ModularSelectTypes;
};

interface InputStateTypes {
  value: string | number;
  label: string;
  error?: string;
}

const ThreeInput: FunctionComponent<ThreeInputTypes> = ({
  formula,
  inputLabels,
  inputSelects,
}) => {
  // Destructure input labels
  const { inputOneLabel, inputTwoLabel, inputThreeLabel, outputLabel } =
    inputLabels;

  // Destructure input selects
  const {
    inputOneSelect,
    inputOneBaseUnit,
    inputOneSelectedUnits,
    inputTwoSelect,
    inputTwoBaseUnit,
    inputTwoSelectedUnits,
    inputThreeSelect,
    inputThreeBaseUnit,
    inputThreeSelectedUnits,
    outputSelect,
    outputBaseUnit,
    outputSelectedUnits,
  } = inputSelects;

  // Input states
  const [inputOneStates, setInputOneStates] = useState<InputStateTypes>({
    value: '',
    label: inputOneLabel,
    error: '',
  });
  const [inputTwoStates, setInputTwoStates] = useState<InputStateTypes>({
    value: '',
    label: inputTwoLabel,
    error: '',
  });
  const [inputThreeStates, setInputThreeStates] = useState<InputStateTypes>({
    value: '',
    label: inputThreeLabel,
    error: '',
  });

  // Select states
  const [inputOneSelectStates, setInputOneSelectStates] = useState({
    inputOneLabel: inputOneSelect ? inputOneBaseUnit?.label : '',
    inputOneValue: inputOneSelect ? inputOneBaseUnit?.value : '',
  });
  const [inputTwoSelectStates, setInputTwoSelectStates] = useState({
    inputTwoLabel: inputTwoSelect ? inputTwoBaseUnit?.label : '',
    inputTwoValue: inputTwoSelect ? inputTwoBaseUnit?.value : '',
  });
  const [inputThreeSelectStates, setInputThreeSelectStates] = useState({
    inputThreeLabel: inputThreeSelect ? inputThreeBaseUnit?.label : '',
    inputThreeValue: inputThreeSelect ? inputThreeBaseUnit?.value : '',
  });
  const [outputSelectStates, setOutputSelectStates] = useState({
    outputLabel: outputSelect ? outputBaseUnit?.label : '',
    outputValue: outputSelect ? outputBaseUnit?.value : '',
  });

  // Output state
  const [outputState, setOutputState] = useState<InputStateTypes>({
    value: '',
    label: outputLabel,
  });

  // Handle select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value, options, selectedIndex } = e.target;

    // Set input one select states
    if (id === (inputOneLabel.replaceAll(' ', '-') + '-select').toLowerCase()) {
      return setInputOneSelectStates({
        inputOneLabel: options[selectedIndex].text,
        inputOneValue: value,
      });
    }

    // Set input two select states
    if (id === (inputTwoLabel.replaceAll(' ', '-') + '-select').toLowerCase()) {
      return setInputTwoSelectStates({
        inputTwoLabel: options[selectedIndex].text,
        inputTwoValue: value,
      });
    }

    // Set input three select states
    if (
      id === (inputThreeLabel.replaceAll(' ', '-') + '-select').toLowerCase()
    ) {
      return setInputThreeSelectStates({
        inputThreeLabel: options[selectedIndex].text,
        inputThreeValue: value,
      });
    }

    // Set output select states
    if (id === (outputLabel + '-select').toLowerCase()) {
      return setOutputSelectStates({
        outputLabel: options[selectedIndex].text,
        outputValue: value,
      });
    }
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if inputs are empty
    if (!inputOneStates.value || !inputTwoStates.value) {
      return;
    }

    // Set input values in case of conversion is needed
    const inputOneValue = inputConversion({
      inputStates: inputOneStates,
      selectBaseUnit: inputOneBaseUnit,
      selectTargetUnit: inputOneSelectStates.inputOneValue,
    });

    const inputTwoValue = inputConversion({
      inputStates: inputTwoStates,
      selectBaseUnit: inputTwoBaseUnit,
      selectTargetUnit: inputTwoSelectStates.inputTwoValue,
    });

    const inputThreeValue = inputConversion({
      inputStates: inputThreeStates,
      selectBaseUnit: inputThreeBaseUnit,
      selectTargetUnit: inputThreeSelectStates.inputThreeValue,
    });

    // Check the unique values of the formula
    const uniqueValues = Array.from(new Set(formula.match(/\b[a-zA-Z]\b/g)));

    // Create dynamic formula from the input values
    let dynamicFormula = formula;

    // Replace the unique values with the input values
    uniqueValues.forEach((value, index) => {
      dynamicFormula = dynamicFormula.replaceAll(
        // Created dynamic regex to match the unique values of the formula
        new RegExp(`\\b${value}\\b`, 'gi'),

        // Replace the unique values with the input values
        [String(inputOneValue), String(inputTwoValue), String(inputThreeValue)][
          index
        ]
      );
    });

    // Evaluate the dynamic formula
    const result = evaluateFormula({
      formula: dynamicFormula,
      fixedLength: 3,
    });

    // If output select is true, convert the result
    const outputValue = inputConversion({
      inputStates: { value: result, label: outputLabel },
      selectBaseUnit: outputBaseUnit,
      selectTargetUnit: outputSelectStates.outputValue,
    });

    // Set output value
    setOutputState({
      ...outputState,
      value: outputValue,
    });
  };

  return (
    <form className='py-3' onSubmit={onSubmit}>
      <div className='flex items-center'>
        <div className='w-full'>
          <div className='grid lg:grid-cols-2 gap-3'>
            <div className='flex items-center'>
              <div className='w-full'>
                <AppInput
                  id='inputOne'
                  type='number'
                  label={`${
                    inputOneSelect && inputOneSelectStates.inputOneLabel
                      ? inputOneLabel +
                        ` (` +
                        inputOneSelectStates.inputOneLabel.split('(')[1] +
                        ` `
                      : inputOneLabel
                  }`}
                  value={inputOneStates.value}
                  placeholder='Enter value'
                  onChange={(e) =>
                    setInputOneStates({
                      ...inputOneStates,
                      value: e.target.value,
                      error: '',
                    })
                  }
                  onBlur={(e) => {
                    // Check if input is empty
                    if (!e.target.value) {
                      return setInputOneStates({
                        ...inputOneStates,
                        error: 'Value is required',
                      });
                    }
                  }}
                  customStyle={`${inputOneSelect && 'rounded-r-none'}`}
                  error={inputOneStates.error}
                />
              </div>
              {inputOneSelect && (
                <AppModularSelect
                  selectHandler={handleSelectChange}
                  selectedUnit={inputOneSelectStates.inputOneValue || ''}
                  selectLabel={String(inputOneLabel)}
                  selectedUnits={inputOneSelectedUnits || []}
                  selectBaseUnit={inputOneBaseUnit}
                />
              )}
            </div>
            <div className='flex items-center'>
              <div className='w-full'>
                <AppInput
                  id='inputTwo'
                  type='number'
                  label={`${
                    inputTwoSelect && inputTwoSelectStates.inputTwoLabel
                      ? inputTwoLabel +
                        ` (` +
                        inputTwoSelectStates.inputTwoLabel.split('(')[1] +
                        ` `
                      : inputTwoLabel
                  }`}
                  value={inputTwoStates.value}
                  placeholder='Enter value'
                  onChange={(e) =>
                    setInputTwoStates({
                      ...inputTwoStates,
                      value: e.target.value,
                      error: '',
                    })
                  }
                  onBlur={(e) => {
                    // Check if input is empty
                    if (!e.target.value) {
                      return setInputTwoStates({
                        ...inputTwoStates,
                        error: 'Value is required',
                      });
                    }
                  }}
                  customStyle={`${inputTwoSelect && 'rounded-r-none'}`}
                  error={inputTwoStates.error}
                />
              </div>
              {inputTwoSelect && (
                <AppModularSelect
                  selectHandler={handleSelectChange}
                  selectedUnit={inputTwoSelectStates.inputTwoValue || ''}
                  selectLabel={String(inputTwoLabel)}
                  selectedUnits={inputTwoSelectedUnits || []}
                  selectBaseUnit={inputTwoBaseUnit}
                />
              )}
            </div>
          </div>
          <div className='flex items-center mt-3'>
            <div className='w-full'>
              <AppInput
                id='inputThree'
                type='number'
                label={`${
                  inputThreeSelect && inputThreeSelectStates.inputThreeLabel
                    ? inputThreeLabel +
                      ` (` +
                      inputThreeSelectStates.inputThreeLabel.split('(')[1] +
                      ` `
                    : inputThreeLabel
                }`}
                value={inputThreeStates.value}
                placeholder='Enter value'
                onChange={(e) =>
                  setInputThreeStates({
                    ...inputThreeStates,
                    value: e.target.value,
                    error: '',
                  })
                }
                onBlur={(e) => {
                  // Check if input is empty
                  if (!e.target.value) {
                    return setInputThreeStates({
                      ...inputThreeStates,
                      error: 'Value is required',
                    });
                  }
                }}
                customStyle={`${inputThreeSelect && 'rounded-r-none'}`}
                error={inputThreeStates.error}
              />
            </div>
            {inputThreeSelect && (
              <AppModularSelect
                selectHandler={handleSelectChange}
                selectedUnit={inputThreeSelectStates.inputThreeValue || ''}
                selectLabel={String(inputThreeLabel)}
                selectedUnits={inputThreeSelectedUnits || []}
                selectBaseUnit={inputThreeBaseUnit}
              />
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center mt-3'>
        <AppOutput
          id='output'
          label={`${
            outputSelect && outputSelectStates.outputLabel
              ? outputLabel +
                ` (` +
                outputSelectStates.outputLabel.split('(')[1] +
                ` `
              : outputLabel
          }`}
          value={outputState.value}
          placeholder='Calculated value'
          customStyle={`${outputSelect && 'rounded-r-none'}`}
        />
        {outputSelect && (
          <AppModularSelect
            selectHandler={handleSelectChange}
            selectedUnit={outputSelectStates.outputValue || ''}
            selectLabel={String(outputLabel)}
            selectedUnits={outputSelectedUnits || []}
            selectBaseUnit={outputBaseUnit}
          />
        )}
      </div>
      <div className='mt-6'>
        <AppButton
          type='submit'
          id='submit'
          disabled={false}
          text='Calculate'
        />
      </div>
    </form>
  );
};

export default ThreeInput;
