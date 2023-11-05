'use client';
// Api & Core imports
import React, { FunctionComponent, useState, useMemo } from 'react';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import AppOutput from '@/components/Shared/Form/AppOutput';
import AppSelect from '@/components/Shared/Form/AppSelect';

// Functions
import SlantHeightFunction from '@/functions/calculators/slantHeight';

// Types
interface InputStateTypes {
  value: string | number;
  error?: string;
}

const SlantHeightCalculator: FunctionComponent = () => {
  // Input states
  const [customPyramidTypeStates, setCustomPyramidTypeStates] =
    useState<InputStateTypes>({
      value: '',
      error: '',
    });
  const [sideLengthStates, setSideLengthStates] = useState<InputStateTypes>({
    value: '',
    error: '',
  });
  const [heightStates, setHeightStates] = useState<InputStateTypes>({
    value: '',
    error: '',
  });

  // Select states
  const [pyramidType, setPyramidType] = useState<string>('square');
  /* const [sideLengthUnit, setSideLengthUnit] = useState<string>('centimeter');
  const [heightUnit, setHeightUnit] = useState<string>('centimeter');
  const [slantHeightUnit, setSlantHeightUnit] = useState<string>('centimeter'); */

  // Output states
  const [outputStates, setOutputStates] = useState<InputStateTypes>({
    value: '',
    error: '',
  });

  // Check if inputs are valid
  const isValid = useMemo(() => {
    if (!sideLengthStates.value || !heightStates.value) {
      return false;
    }

    return true;
  }, [sideLengthStates.value, heightStates.value]);

  // Handle submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if inputs are valid
    if (!isValid) {
      return;
    }

    // Calculate slant height
    const slantHeight = SlantHeightFunction({
      shape: pyramidType,
      customPyramidShapeSize: Number(customPyramidTypeStates.value),
      sideLength: Number(sideLengthStates.value),
      height: Number(heightStates.value),
    });

    // Set output states
    setOutputStates({
      value: slantHeight,
      error: '',
    });
  };

  return (
    <form className='py-3' onSubmit={onSubmit}>
      <div className='flex items-center'>
        <div className='w-full'>
          <div
            className={`${
              pyramidType === 'custom' && 'grid lg:grid-cols-2 gap-3'
            }`}
          >
            <AppSelect
              id='pyramid-type'
              label='Pyramid type'
              value={pyramidType}
              onChange={(e) => {
                setPyramidType(e.target.value);
              }}
            >
              <option value='triangular'>Triangular Pyramid</option>
              <option value='square'>Square Pyramid</option>
              <option value='pentagonal'>Pentagonal Pyramid</option>
              <option value='hexagonal'>Hexagonal Pyramid</option>
              <option value='heptagonal'>Heptagonal Pyramid</option>
              <option value='octagonal'>Octagonal Pyramid</option>
              <option value='custom'>Custom-sided Pyramid</option>
            </AppSelect>

            {pyramidType === 'custom' && (
              <div>
                <AppInput
                  id='custom-pyramid-type'
                  label='Number of sides'
                  placeholder='Enter number of sides'
                  value={customPyramidTypeStates.value}
                  error={customPyramidTypeStates.error}
                  onBlur={(e) => {
                    // Check if input is empty
                    if (!e.target.value) {
                      return setCustomPyramidTypeStates({
                        value: '',
                        error: 'Number of sides is required',
                      });
                    }
                  }}
                  onChange={(e) =>
                    setCustomPyramidTypeStates({
                      value: e.target.value,
                      error: '',
                    })
                  }
                  customStyle={`rounded-r-none`}
                />
              </div>
            )}
          </div>
          <div className='grid lg:grid-cols-2 gap-3 mt-3'>
            <div className='w-full flex items-center'>
              <div className='w-full'>
                <AppInput
                  id='side-length'
                  label='Side Length'
                  placeholder='Enter side length'
                  value={sideLengthStates.value}
                  error={sideLengthStates.error}
                  onBlur={(e) => {
                    // Check if input is empty
                    if (!e.target.value) {
                      return setSideLengthStates({
                        value: '',
                        error: 'Side length is required',
                      });
                    }
                  }}
                  onChange={(e) =>
                    setSideLengthStates({
                      value: e.target.value,
                      error: '',
                    })
                  }
                />
              </div>
            </div>
            <div className='w-full flex items-center'>
              <div className='w-full'>
                <AppInput
                  id='height'
                  label='Height'
                  placeholder='Enter height'
                  value={heightStates.value}
                  error={heightStates.error}
                  onBlur={(e) => {
                    // Check if input is empty
                    if (!e.target.value) {
                      return setHeightStates({
                        value: '',
                        error: 'Height is required',
                      });
                    }
                  }}
                  onChange={(e) =>
                    setHeightStates({
                      value: e.target.value,
                      error: '',
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center mt-3'>
        <AppOutput
          id='output'
          label={`Slant height of the ${pyramidType} pyramid`}
          value={outputStates.value}
          placeholder='Calculated value'
        />
      </div>
      <div className='mt-6'>
        <AppButton
          type='submit'
          id='submit'
          disabled={!isValid}
          text='Calculate'
        />
      </div>
    </form>
  );
};

export default SlantHeightCalculator;
