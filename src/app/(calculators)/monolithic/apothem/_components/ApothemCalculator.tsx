'use client';
// Api & Core imports
import React, { FunctionComponent, useState, useMemo } from 'react';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import AppOutput from '@/components/Shared/Form/AppOutput';
import AppSelect from '@/components/Shared/Form/AppSelect';

// Functions
import apothemFunction from '@/functions/calculators/apothem';

// Types
interface InputStateTypes {
  value: string | number;
  error?: string;
}

const ApothemCalculator: FunctionComponent = () => {
  // Input states
  const [sideLengthStates, setSideLengthStates] = useState<InputStateTypes>({
    value: '',
    error: '',
  });

  // Select states
  const [pyramidType, setPyramidType] = useState<string>('square');
  /* const [sideLengthUnit, setSideLengthUnit] = useState<string>('centimeter');
  const [apothemUnit, setApothemUnit] = useState<string>('centimeter'); */

  // Output states
  const [outputStates, setOutputStates] = useState<InputStateTypes>({
    value: '',
    error: '',
  });

  // Check if inputs are valid
  const isValid = useMemo(() => {
    if (!sideLengthStates.value) {
      return false;
    }

    return true;
  }, [sideLengthStates.value]);

  // Handle submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate side length
    if (!sideLengthStates.value) {
      setSideLengthStates({
        value: '',
        error: 'Side length is required',
      });
      return;
    }

    // Calculate apothem
    const apothem = apothemFunction({
      sideLength: Number(sideLengthStates.value),
      shape: pyramidType,
    });

    // Set output states
    setOutputStates({
      value: apothem,
      error: '',
    });
  };

  return (
    <form className='py-3' onSubmit={onSubmit}>
      <div className='flex items-center'>
        <div className='w-full'>
          <div className='grid lg:grid-cols-2 gap-3'>
            <AppSelect
              id='polygonal-base'
              label='Polygonal base'
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
            </AppSelect>

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
          </div>
        </div>
      </div>
      <div className='flex items-center mt-3'>
        <AppOutput
          id='output'
          label={`Apothem of the ${pyramidType} pyramid`}
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

export default ApothemCalculator;
