'use client';
// Api & Core imports
import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';

// Components
import AppInput from '@/components/Shared/Form/AppInput';
import AppButton from '@/components/Shared/Form/AppButton';
import AppOutput from '@/components/Shared/Form/AppOutput';
import AppSelect from '@/components/Shared/Form/AppSelect';
import sodiumCorrectionFunction from '@/functions/calculators/sodium';

// Functions

// Types
interface InputStateTypes {
  value: string | number;
  error?: string;
}

const SodiumCalculator: FunctionComponent = () => {
  // Input states
  const [currentNa, setCurrentNa] = useState<InputStateTypes>({
    value: '',
    error: '',
  });
  const [desiredNa, setDesiredNa] = useState<InputStateTypes>({
    value: '',
    error: '',
  });
  const [weight, setWeight] = useState<InputStateTypes>({
    value: '',
    error: '',
  });
  const [rateOfNaCorrection, setRateOfNaCorrection] = useState<InputStateTypes>(
    {
      value: '',
      error: '',
    }
  );
  const [temperature, setTemperature] = useState<InputStateTypes>({
    value: 37,
    error: '',
  });
  const [waterLossAmount, setWaterLossAmount] = useState<InputStateTypes>({
    value: 1000,
    error: '',
  });

  // Select states
  const [gender, setGender] = useState('man');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [formula, setFormula] = useState('adrogue');
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [waterLossUnit, setWaterLossUnit] = useState('ml/day');
  const [ivfRateUnit, setIvfRateUnit] = useState('ml/hour');
  const [fluid, setFluid] = useState('five-nacl');

  // Checkbox states
  const [isFever, setIsFever] = useState(false);
  const [isWaterLoss, setIsWaterLoss] = useState(false);

  // Output states
  const [outputStates, setOutputStates] = useState<InputStateTypes>({
    value: '',
    error: '',
  });

  // Check if inputs are valid
  const isValid = useMemo(() => {
    if (
      !currentNa.value ||
      !desiredNa.value ||
      !weight.value ||
      !rateOfNaCorrection.value
    ) {
      return false;
    }
    return true;
  }, [
    currentNa.value,
    desiredNa.value,
    weight.value,
    rateOfNaCorrection.value,
  ]);

  // Calculate desiredNa if not provided
  useEffect(() => {
    const currentNaValue = Number(currentNa.value);

    if (currentNaValue <= 12) {
      setDesiredNa({ value: '' });
    } else if (currentNaValue >= 145) {
      const targetNa = currentNaValue - 10;
      setDesiredNa({ value: Math.max(targetNa, 145).toString() });
    } else if (currentNaValue >= 130) {
      setDesiredNa({ value: '140' });
    } else {
      setDesiredNa({ value: '130' });
    }

    //! Don't remove this comment eslint disabled because it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNa.value]);

  // Calculate rateOfNaCorrection if not provided
  useEffect(() => {
    const currentNaValue = Number(currentNa.value);
    const rateOfNaCorrectionValue = Number(rateOfNaCorrection.value);

    if (currentNaValue && !rateOfNaCorrectionValue) {
      setRateOfNaCorrection({ value: '0.5' });
    } else if (
      (currentNaValue > 140 && rateOfNaCorrectionValue > 0) ||
      (currentNaValue < 140 && rateOfNaCorrectionValue < 0)
    ) {
      setRateOfNaCorrection({ value: `${-rateOfNaCorrectionValue}` });
    }

    //! Don't remove this comment eslint disabled because it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNa.value, rateOfNaCorrection.value]);

  // Handle submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if inputs are valid
    if (!isValid) {
      return;
    }

    // Calculate sodium
    const sodium = sodiumCorrectionFunction({
      currentNa: Number(currentNa.value),
      desiredNa: Number(desiredNa.value),
      rateOfNaCorrection: Number(rateOfNaCorrection.value),
      fluid,
      weight: Number(weight.value),
      weightUnit,
      gender,
      isFever,
      temperature: Number(temperature.value),
      temperatureUnit,
      isWaterLoss,
      waterLossAmount: Number(waterLossAmount.value),
      waterLossUnit,
      formula,
      ivfRateUnit,
    });

    // Set output states
    setOutputStates({
      value: sodium,
      error: '',
    });
  };

  return (
    <form className='py-3' onSubmit={onSubmit}>
      <div className='grid gap-3'>
        <div className='grid lg:grid-cols-2 gap-3'>
          <div className='flex items-center'>
            <div className='w-full'>
              <AppInput
                id='current-na'
                label={`Current Na`}
                value={currentNa.value}
                placeholder='Enter current Na'
                onChange={(e) => {
                  setCurrentNa({ value: e.target.value, error: '' });
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setCurrentNa({
                      value: '',
                      error: 'Current sodium is required',
                    });
                  }
                }}
                error={currentNa.error}
              />
            </div>
          </div>
          <div className='flex items-center'>
            <div className='w-full'>
              <AppInput
                id='desired-na'
                label={`Desired Na`}
                value={desiredNa.value}
                placeholder='Enter desired Na'
                onChange={(e) => {
                  setDesiredNa({ value: e.target.value, error: '' });
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setDesiredNa({
                      value: '',
                      error: 'Desired sodium is required',
                    });
                  }
                }}
                error={desiredNa.error}
              />
            </div>
          </div>
        </div>

        <div className='grid lg:grid-cols-2 gap-3'>
          <div>
            <AppSelect
              id='gender'
              label='Gender'
              onChange={(e) => {
                setGender(e.target.value);
              }}
              value={gender}
            >
              <option value='man'>Man</option>
              <option value='woman'>Woman</option>
              <option value='el_man'>Elderly Man</option>
              <option value='el_woman'>Elderly Woman</option>
              <option value='children'>Children</option>
            </AppSelect>
          </div>

          <div className='flex items-center'>
            <div className='w-full'>
              <AppInput
                id='weight'
                label='Weight'
                placeholder='Enter weight'
                value={weight.value}
                error={weight.error}
                onBlur={(e) => {
                  // Check if input is empty
                  if (!e.target.value) {
                    return setWeight({
                      value: '',
                      error: 'Weight is required',
                    });
                  }
                }}
                onChange={(e) =>
                  setWeight({
                    value: e.target.value,
                    error: '',
                  })
                }
                customStyle={`rounded-r-none`}
              />
            </div>
            <div>
              <AppSelect
                id='weight-unit'
                label='Weight unit'
                value={weightUnit}
                onChange={(e) => {
                  setWeightUnit(e.target.value);
                }}
                isWithInput={true}
              >
                <option value='kilogram'>Kilogram (kg)</option>
                <option value='pounds'>Pound (lb)</option>
              </AppSelect>
            </div>
          </div>
        </div>

        <div className='grid lg:grid-cols-2 gap-3'>
          <div className='flex items-center'>
            <div className='w-full'>
              <AppInput
                id='rate-of-na-correction'
                label={`Rate of Na correction`}
                value={rateOfNaCorrection.value}
                placeholder='Enter rate of Na correction'
                onChange={(e) => {
                  setRateOfNaCorrection({ value: e.target.value, error: '' });
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setRateOfNaCorrection({
                      value: '',
                      error: 'Rate of Na correction is required',
                    });
                  }
                }}
                error={rateOfNaCorrection.error}
              />
            </div>
          </div>
          <div>
            <AppSelect
              id='formula'
              label='Formula'
              onChange={(e) => {
                setFormula(e.target.value);
              }}
              value={formula}
            >
              <option value='adrogue'>Adrogue formula</option>
              <option value='classic'>Classic formula</option>
            </AppSelect>
          </div>
        </div>

        <div>
          <AppSelect
            id='fluid'
            label='Fluid'
            onChange={(e) => {
              setFluid(e.target.value);
            }}
            value={fluid}
          >
            <option value='five-nacl'>5% NaCl in water</option>
            <option value='three-nacl'>3% NaCl in water</option>
            <option value='zero-nine-nacl'>0.9% NaCl in water</option>
            <option value='ringer'>Ringer&apos;s lactate solution</option>
            <option value='zero-forty-five-nacl'>0.45% NaCl in water</option>
            <option value='zero-two-nacl'>0.2% NaCl in water</option>
            <option value='five-dextrose'>5% Dextrose in water</option>
          </AppSelect>
        </div>

        <div className='flex items-center'>
          <AppOutput
            id='output'
            label={`IVF rate`}
            value={outputStates.value}
            placeholder='Calculated value'
            customStyle={`rounded-r-none`}
          />
          <div>
            <AppSelect
              id='ivf-rate-unit'
              label='IVF rate unit'
              value={ivfRateUnit}
              onChange={(e) => {
                setIvfRateUnit(e.target.value);
              }}
              isWithInput={true}
            >
              <option value='ml/hour'>ml/hour</option>
              <option value='ml/min'>ml/min</option>
              <option value='ml/day'>ml/day</option>
              <option value='cc/hour'>cc/hour</option>
              <option value='cc/min'>cc/min</option>
              <option value='cc/day'>cc/day</option>
            </AppSelect>
          </div>
        </div>

        <div className='mt-6 '>
          <div className='border-b-[2px] border-primary text-center'>
            <p className='text-center'>Correction</p>
          </div>
          <div className='grid grid-cols-2'>
            <div className='form-control '>
              <label
                className='label cursor-pointer mx-auto'
                htmlFor='fever-checkbox'
              >
                <span className='label-text'>Fever</span>
              </label>
              <input
                id='fever-checkbox'
                name='fever-checkbox'
                type='checkbox'
                className='toggle toggle-accent -mt-1 mx-auto'
                checked={isFever}
                onChange={() => {
                  setIsFever((prevState) => !prevState);
                }}
              />
            </div>
            <div className='form-control'>
              <label
                className='label cursor-pointer mx-auto'
                htmlFor='waterLoss-checkbox'
              >
                <span className='label-text  line-clamp-1'>
                  Insensible water loss
                </span>
              </label>
              <input
                id='waterLoss-checkbox'
                name='waterLoss-checkbox'
                type='checkbox'
                className='toggle toggle-accent -mt-1 mx-auto'
                checked={isWaterLoss}
                onChange={() => {
                  setIsWaterLoss((prevState) => !prevState);
                }}
              />
            </div>
          </div>
        </div>

        {(isFever || isWaterLoss) && (
          <div
            className={`grid ${
              isFever && isWaterLoss ? 'lg:grid-cols-2 gap-3' : ''
            }`}
          >
            {isFever && (
              <div className='flex items-center'>
                <div className='w-full'>
                  <AppInput
                    id='temperature'
                    label='Temperature'
                    placeholder='Enter temperature'
                    value={temperature.value}
                    error={temperature.error}
                    onBlur={(e) => {
                      // Check if input is empty
                      if (!e.target.value) {
                        return setTemperature({
                          value: '',
                          error: 'Temperature is required',
                        });
                      }
                    }}
                    onChange={(e) =>
                      setTemperature({
                        value: e.target.value,
                        error: '',
                      })
                    }
                    customStyle={`rounded-r-none`}
                  />
                </div>
                <div>
                  <AppSelect
                    id='temperature-unit'
                    label='Temperature unit'
                    value={temperatureUnit}
                    onChange={(e) => {
                      setTemperatureUnit(e.target.value);
                    }}
                    isWithInput={true}
                  >
                    <option value='celsius'>Celsius (°C)</option>
                    <option value='fahrenheit'>Fahrenheit (°F)</option>
                  </AppSelect>
                </div>
              </div>
            )}

            {isWaterLoss && (
              <div className='flex items-center'>
                <div className='w-full'>
                  <AppInput
                    id='water-loss-amount'
                    label={`Water loss amount`}
                    placeholder='Enter water loss amount'
                    value={waterLossAmount.value}
                    error={waterLossAmount.error}
                    onBlur={(e) => {
                      // Check if input is empty
                      if (!e.target.value) {
                        return setWaterLossAmount({
                          value: '',
                          error: 'Water loss amount is required',
                        });
                      }
                    }}
                    onChange={(e) =>
                      setWaterLossAmount({
                        value: e.target.value,
                        error: '',
                      })
                    }
                    customStyle={`rounded-r-none`}
                  />
                </div>
                <div>
                  <AppSelect
                    id='water-loss-unit'
                    label='Water loss unit'
                    value={waterLossUnit}
                    onChange={(e) => {
                      setWaterLossUnit(e.target.value);
                    }}
                    isWithInput={true}
                  >
                    <option value='ml/day'>ml/day</option>
                    <option value='cc/day'>cc/day</option>
                    <option value='l/day'>L/day</option>
                  </AppSelect>
                </div>
              </div>
            )}
          </div>
        )}

        <div className='mt-6'>
          <AppButton
            type='submit'
            id='submit'
            disabled={!isValid}
            text='Calculate'
          />
        </div>
      </div>
    </form>
  );
};

export default SodiumCalculator;
