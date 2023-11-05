'use client';

// Api & core imports
import React, { FunctionComponent } from 'react';

// UI & Icons
import { IoClose } from 'react-icons/io5';

// Components
import SingleSelect from '@/components/Shared/Form/CreateSelect/Single';
import MultipleSelect from '@/components/Shared/Form/CreateSelect/Multiple';

// Hooks
import useUnitsFilter from '@/hooks/useUnitFilter';

// Units
import area from '@/data/units/area.json';
import electric from '@/data/units/electric.json';
import energy from '@/data/units/energy.json';
import frequency from '@/data/units/frequency.json';
import length from '@/data/units/length.json';
import mass from '@/data/units/mass.json';
import pressure from '@/data/units/pressure.json';
import time from '@/data/units/time.json';
import volume from '@/data/units/volume.json';

// Types
import type { SelectTypes, UnitSelectTypes } from '@/types/create-calculator.d';

const UnitSelect: FunctionComponent<UnitSelectTypes> = ({
  baseUnitStates,
  setBaseUnitStates,
  formulaVariables,
  inputOneSelectedUnits,
  setInputOneSelectedUnits,
  inputTwoSelectedUnits,
  setInputTwoSelectedUnits,
  inputThreeSelectedUnits,
  setInputThreeSelectedUnits,
  inputFourSelectedUnits,
  setInputFourSelectedUnits,
  inputFiveSelectedUnits,
  setInputFiveSelectedUnits,
  inputSixSelectedUnits,
  setInputSixSelectedUnits,
  outputSelectedUnits,
  setOutputSelectedUnits,
}) => {
  const variableLength = formulaVariables.length;

  // Destructure baseUnitStates
  const {
    inputOneBaseUnit,
    inputTwoBaseUnit,
    inputThreeBaseUnit,
    inputFourBaseUnit,
    inputFiveBaseUnit,
    inputSixBaseUnit,
    outputBaseUnit,
  } = baseUnitStates;

  const allUnits = [
    ...area,
    ...electric,
    ...energy,
    ...frequency,
    ...length,
    ...mass,
    ...pressure,
    ...time,
    ...volume,
  ] as SelectTypes[];

  // Handle single unit select
  const unitStateHandler = (state: string, value: SelectTypes) => {
    setBaseUnitStates((prevState) => {
      return { ...prevState, [state]: value };
    });
  };

  // Filter units based on base unit
  const inputOneFilteredUnits = useUnitsFilter(allUnits, inputOneBaseUnit);
  const inputTwoFilteredUnits = useUnitsFilter(allUnits, inputTwoBaseUnit);
  const inputThreeFilteredUnits = useUnitsFilter(allUnits, inputThreeBaseUnit);
  const inputFourFilteredUnits = useUnitsFilter(allUnits, inputFourBaseUnit);
  const inputFiveFilteredUnits = useUnitsFilter(allUnits, inputFiveBaseUnit);
  const inputSixFilteredUnits = useUnitsFilter(allUnits, inputSixBaseUnit);
  const outputFilteredUnits = useUnitsFilter(allUnits, outputBaseUnit);

  return (
    <div>
      {/* Unit select states */}
      {variableLength >= 1 && (
        <div className='flex items-center mt-3'>
          <div className='form-control'>
            <label className='label cursor-pointer' htmlFor='use-conversion'>
              <span className='label-text line-clamp-1 mr-3'>
                Want to use conversion between units?
              </span>
              <input
                id='use-conversion'
                name='use-conversion'
                type='checkbox'
                className='toggle toggle-accent'
                checked={baseUnitStates.isUnitSelect}
                onChange={(e) => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    isUnitSelect: e.target.checked,
                    inputOneSelect: false,
                    inputTwoSelect: false,
                    inputThreeSelect: false,
                    inputFourSelect: false,
                    inputFiveSelect: false,
                    inputSixSelect: false,
                    outputSelect: false,
                  });
                }}
              />
            </label>
          </div>
        </div>
      )}

      {/* First unit select checkbox */}
      {baseUnitStates.isUnitSelect &&
        variableLength >= 1 &&
        !baseUnitStates.inputOneSelect && (
          <div className='flex items-center mt-3'>
            <div className='form-control'>
              <label
                className='label cursor-pointer'
                htmlFor={`use-conversion-for-${formulaVariables[0]}`}
              >
                <span className='label-text line-clamp-1 mr-3'>
                  {`Want to use conversion for "${formulaVariables[0]}"?`}
                </span>
                <input
                  id={`use-conversion-for-${formulaVariables[0]}`}
                  name={`use-conversion-for-${formulaVariables[0]}`}
                  type='checkbox'
                  className='toggle toggle-accent'
                  checked={baseUnitStates.inputOneSelect}
                  onChange={(e) => {
                    setBaseUnitStates({
                      ...baseUnitStates,
                      inputOneSelect: e.target.checked,
                    });
                  }}
                />
              </label>
            </div>
          </div>
        )}

      {/* First input select state */}
      {baseUnitStates.inputOneSelect && variableLength >= 1 && (
        <div>
          <div className=' border-b-[1px] create-border-color rounded-lg rounded-b-none py-3 pb-6'>
            <div className='flex items-center justify-between'>
              <p className='text-xl lg:text-2xl  font-semibold '>
                {`Unit conversion for "${formulaVariables[0]}"`}
              </p>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    inputOneSelect: false,
                    inputOneBaseUnit: { value: '', label: '', category: '' },
                  });
                }}
              >
                <IoClose className='text-error' size={25} />
              </button>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-3 mdMax:mt-3'>
              <div>
                <SingleSelect
                  id={`select-base-unit-for-${formulaVariables[0]}`}
                  label={`Select base unit for "${formulaVariables[0]}"`}
                  searchId={`search-in-base-unit-for-${formulaVariables[0]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in base units'
                  selectionLabel='Select base unit'
                  options={allUnits}
                  selectedOption={inputOneBaseUnit}
                  setSelectedOption={(value) => {
                    unitStateHandler('inputOneBaseUnit', value as SelectTypes);
                  }}
                />
              </div>
              <div className='mdMax:mt-3'>
                <MultipleSelect
                  id={`select-conversion-units-for-${formulaVariables[0]}`}
                  label={`Select conversion units for "${formulaVariables[0]}"`}
                  searchId={`search-in-conversion-units-for-${formulaVariables[0]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in conversion units'
                  selectionLabel='Select conversion units'
                  options={inputOneFilteredUnits}
                  selectedOptions={inputOneSelectedUnits}
                  setSelectedOptions={setInputOneSelectedUnits}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second unit select checkbox */}
      {baseUnitStates.isUnitSelect &&
        variableLength >= 2 &&
        !baseUnitStates.inputTwoSelect && (
          <div className='flex items-center mt-3'>
            <div className='form-control'>
              <label
                className='label cursor-pointer'
                htmlFor={`use-conversion-for-${formulaVariables[1]}`}
              >
                <span className='label-text line-clamp-1 mr-3'>
                  {`Want to use conversion for "${formulaVariables[1]}"?`}
                </span>
                <input
                  id={`use-conversion-for-${formulaVariables[1]}`}
                  name={`use-conversion-for-${formulaVariables[1]}`}
                  type='checkbox'
                  className='toggle toggle-accent'
                  checked={baseUnitStates.inputTwoSelect}
                  onChange={(e) => {
                    setBaseUnitStates({
                      ...baseUnitStates,
                      inputTwoSelect: e.target.checked,
                    });
                  }}
                />
              </label>
            </div>
          </div>
        )}

      {/* Second input select state */}
      {variableLength >= 2 && baseUnitStates.inputTwoSelect && (
        <div>
          <div className='mt-3 border-b-[1px] create-border-color rounded-lg rounded-b-none pb-6'>
            <div className='flex items-center justify-between'>
              <p className='text-xl lg:text-2xl  font-semibold '>
                {`Unit conversion for "${formulaVariables[1]}"`}
              </p>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    inputTwoSelect: false,
                    inputTwoBaseUnit: { value: '', label: '', category: '' },
                  });
                }}
              >
                <IoClose className='text-error' size={25} />
              </button>
            </div>

            <div className='md:grid md:grid-cols-2 md:gap-3 w-full pr-2'>
              <div>
                <SingleSelect
                  id={`select-base-unit-for-${formulaVariables[1]}`}
                  label={`Select base unit for "${formulaVariables[1]}"`}
                  searchId={`search-in-base-unit-for-${formulaVariables[1]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in base units'
                  selectionLabel='Select base unit'
                  options={allUnits}
                  selectedOption={inputTwoBaseUnit}
                  setSelectedOption={(value) => {
                    unitStateHandler('inputTwoBaseUnit', value as SelectTypes);
                  }}
                />
              </div>
              <div className='mdMax:mt-3'>
                <MultipleSelect
                  id={`select-conversion-units-for-${formulaVariables[1]}`}
                  label={`Select conversion units for "${formulaVariables[1]}"`}
                  searchId={`search-in-conversion-units-for-${formulaVariables[1]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in conversion units'
                  selectionLabel='Select conversion units'
                  options={inputTwoFilteredUnits}
                  selectedOptions={inputTwoSelectedUnits}
                  setSelectedOptions={setInputTwoSelectedUnits}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Third unit select checkbox */}
      {baseUnitStates.isUnitSelect &&
        variableLength >= 3 &&
        !baseUnitStates.inputThreeSelect && (
          <div className='flex items-center mt-3'>
            <div className='form-control'>
              <label
                className='label cursor-pointer'
                htmlFor={`use-conversion-for-${formulaVariables[2]}`}
              >
                <span className='label-text line-clamp-1 mr-3'>
                  {`Want to use conversion for "${formulaVariables[2]}"?`}
                </span>
                <input
                  id={`use-conversion-for-${formulaVariables[2]}`}
                  name={`use-conversion-for-${formulaVariables[2]}`}
                  type='checkbox'
                  className='toggle toggle-accent'
                  checked={baseUnitStates.inputThreeSelect}
                  onChange={(e) => {
                    setBaseUnitStates({
                      ...baseUnitStates,
                      inputThreeSelect: e.target.checked,
                    });
                  }}
                />
              </label>
            </div>
          </div>
        )}

      {/* Third input select state */}
      {variableLength >= 3 && baseUnitStates.inputThreeSelect && (
        <div>
          <div className='mt-3 border-b-[1px] create-border-color rounded-lg rounded-b-none pb-6'>
            <div className='flex items-center justify-between'>
              <p className='text-xl lg:text-2xl  font-semibold '>
                {`Unit conversion for "${formulaVariables[2]}"`}
              </p>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    inputThreeSelect: false,
                    inputThreeBaseUnit: { value: '', label: '', category: '' },
                  });
                }}
              >
                <IoClose className='text-error' size={25} />
              </button>
            </div>

            <div className='md:grid md:grid-cols-2 md:gap-3 w-full pr-2'>
              <div>
                <SingleSelect
                  id={`select-base-unit-for-${formulaVariables[2]}`}
                  label={`Select base unit for "${formulaVariables[2]}"`}
                  searchId={`search-in-base-unit-for-${formulaVariables[2]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in base units'
                  selectionLabel='Select base unit'
                  options={allUnits}
                  selectedOption={inputThreeBaseUnit}
                  setSelectedOption={(value) => {
                    unitStateHandler(
                      'inputThreeBaseUnit',
                      value as SelectTypes
                    );
                  }}
                />
              </div>
              <div className='mdMax:mt-3'>
                <MultipleSelect
                  id={`select-conversion-units-for-${formulaVariables[2]}`}
                  label={`Select conversion units for "${formulaVariables[2]}"`}
                  searchId={`search-in-conversion-units-for-${formulaVariables[2]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in conversion units'
                  selectionLabel='Select conversion units'
                  options={inputThreeFilteredUnits}
                  selectedOptions={inputThreeSelectedUnits}
                  setSelectedOptions={setInputThreeSelectedUnits}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fourth unit select checkbox */}
      {baseUnitStates.isUnitSelect &&
        variableLength >= 4 &&
        !baseUnitStates.inputFourSelect && (
          <div className='flex items-center mt-3'>
            <div className='form-control'>
              <label
                className='label cursor-pointer'
                htmlFor={`use-conversion-for-${formulaVariables[3]}`}
              >
                <span className='label-text line-clamp-1 mr-3'>
                  {`Want to use conversion for "${formulaVariables[3]}"?`}
                </span>
                <input
                  id={`use-conversion-for-${formulaVariables[3]}`}
                  name={`use-conversion-for-${formulaVariables[3]}`}
                  type='checkbox'
                  className='toggle toggle-accent'
                  checked={baseUnitStates.inputFourSelect}
                  onChange={(e) => {
                    setBaseUnitStates({
                      ...baseUnitStates,
                      inputFourSelect: e.target.checked,
                    });
                  }}
                />
              </label>
            </div>
          </div>
        )}

      {/* Fourth input select state */}
      {variableLength >= 4 && baseUnitStates.inputFourSelect && (
        <div>
          <div className='mt-3 border-b-[1px] create-border-color rounded-lg rounded-b-none pb-6'>
            <div className='flex items-center justify-between'>
              <p className='text-xl lg:text-2xl  font-semibold '>
                {`Unit conversion for "${formulaVariables[3]}"`}
              </p>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    inputFourSelect: false,
                    inputFourBaseUnit: { value: '', label: '', category: '' },
                  });
                }}
              >
                <IoClose className='text-error' size={25} />
              </button>
            </div>

            <div className='md:grid md:grid-cols-2 md:gap-3 w-full pr-2'>
              <div>
                <SingleSelect
                  id={`select-base-unit-for-${formulaVariables[3]}`}
                  label={`Select base unit for "${formulaVariables[3]}"`}
                  searchId={`search-in-base-unit-for-${formulaVariables[3]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in base units'
                  selectionLabel='Select base unit'
                  options={allUnits}
                  selectedOption={inputFourBaseUnit}
                  setSelectedOption={(value) => {
                    unitStateHandler('inputFourBaseUnit', value as SelectTypes);
                  }}
                />
              </div>
              <div className='mdMax:mt-3'>
                <MultipleSelect
                  id={`select-conversion-units-for-${formulaVariables[3]}`}
                  label={`Select conversion units for "${formulaVariables[3]}"`}
                  searchId={`search-in-conversion-units-for-${formulaVariables[3]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in conversion units'
                  selectionLabel='Select conversion units'
                  options={inputFourFilteredUnits}
                  selectedOptions={inputFourSelectedUnits}
                  setSelectedOptions={setInputFourSelectedUnits}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fifth unit select checkbox */}
      {baseUnitStates.isUnitSelect &&
        variableLength >= 5 &&
        !baseUnitStates.inputFiveSelect && (
          <div className='flex items-center mt-3'>
            <div className='form-control'>
              <label
                className='label cursor-pointer'
                htmlFor={`use-conversion-for-${formulaVariables[4]}`}
              >
                <span className='label-text line-clamp-1 mr-3'>
                  {`Want to use conversion for "${formulaVariables[4]}"?`}
                </span>
                <input
                  id={`use-conversion-for-${formulaVariables[4]}`}
                  name={`use-conversion-for-${formulaVariables[4]}`}
                  type='checkbox'
                  className='toggle toggle-accent'
                  checked={baseUnitStates.inputFiveSelect}
                  onChange={(e) => {
                    setBaseUnitStates({
                      ...baseUnitStates,
                      inputFiveSelect: e.target.checked,
                    });
                  }}
                />
              </label>
            </div>
          </div>
        )}

      {/* Fifth input select state */}
      {variableLength >= 5 && baseUnitStates.inputFiveSelect && (
        <div>
          <div className='mt-3 border-b-[1px] create-border-color rounded-lg rounded-b-none pb-6'>
            <div className='flex items-center justify-between'>
              <p className='text-xl lg:text-2xl  font-semibold '>
                {`Unit conversion for "${formulaVariables[4]}"`}
              </p>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    inputFiveSelect: false,
                    inputFiveBaseUnit: { value: '', label: '', category: '' },
                  });
                }}
              >
                <IoClose className='text-error' size={25} />
              </button>
            </div>

            <div className='md:grid md:grid-cols-2 md:gap-3 w-full pr-2'>
              <div>
                <SingleSelect
                  id={`select-base-unit-for-${formulaVariables[4]}`}
                  label={`Select base unit for "${formulaVariables[4]}"`}
                  searchId={`search-in-base-unit-for-${formulaVariables[4]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in base units'
                  selectionLabel='Select base unit'
                  options={allUnits}
                  selectedOption={inputFiveBaseUnit}
                  setSelectedOption={(value) => {
                    unitStateHandler('inputFiveBaseUnit', value as SelectTypes);
                  }}
                />
              </div>
              <div className='mdMax:mt-3'>
                <MultipleSelect
                  id={`select-conversion-units-for-${formulaVariables[4]}`}
                  label={`Select conversion units for "${formulaVariables[4]}"`}
                  searchId={`search-in-conversion-units-for-${formulaVariables[4]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in conversion units'
                  selectionLabel='Select conversion units'
                  options={inputFiveFilteredUnits}
                  selectedOptions={inputFiveSelectedUnits}
                  setSelectedOptions={setInputFiveSelectedUnits}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sixth unit select checkbox */}
      {baseUnitStates.isUnitSelect &&
        variableLength >= 6 &&
        !baseUnitStates.inputSixSelect && (
          <div className='flex items-center mt-3'>
            <div className='form-control'>
              <label
                className='label cursor-pointer'
                htmlFor={`use-conversion-for-${formulaVariables[5]}`}
              >
                <span className='label-text line-clamp-1 mr-3'>
                  {`Want to use conversion for "${formulaVariables[5]}"?`}
                </span>
                <input
                  id={`use-conversion-for-${formulaVariables[5]}`}
                  name={`use-conversion-for-${formulaVariables[5]}`}
                  type='checkbox'
                  className='toggle toggle-accent'
                  checked={baseUnitStates.inputSixSelect}
                  onChange={(e) => {
                    setBaseUnitStates({
                      ...baseUnitStates,
                      inputSixSelect: e.target.checked,
                    });
                  }}
                />
              </label>
            </div>
          </div>
        )}

      {/* Sixth input select state */}
      {variableLength >= 6 && baseUnitStates.inputSixSelect && (
        <div>
          <div className='mt-3 border-b-[1px] create-border-color rounded-lg rounded-b-none pb-6'>
            <div className='flex items-center justify-between'>
              <p className='text-xl lg:text-2xl  font-semibold '>
                {`Unit conversion for "${formulaVariables[5]}"`}
              </p>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    inputSixSelect: false,
                    inputSixBaseUnit: { value: '', label: '', category: '' },
                  });
                }}
              >
                <IoClose className='text-error' size={25} />
              </button>
            </div>

            <div className='md:grid md:grid-cols-2 md:gap-3 w-full pr-2'>
              <div>
                <SingleSelect
                  id={`select-base-unit-for-${formulaVariables[5]}`}
                  label={`Select base unit for "${formulaVariables[5]}"`}
                  searchId={`search-in-base-unit-for-${formulaVariables[5]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in base units'
                  selectionLabel='Select base unit'
                  options={allUnits}
                  selectedOption={inputSixBaseUnit}
                  setSelectedOption={(value) => {
                    unitStateHandler('inputSixBaseUnit', value as SelectTypes);
                  }}
                />
              </div>
              <div className='mdMax:mt-3'>
                <MultipleSelect
                  id={`select-conversion-units-for-${formulaVariables[5]}`}
                  label={`Select conversion units for "${formulaVariables[5]}"`}
                  searchId={`search-in-conversion-units-for-${formulaVariables[5]}`}
                  searchLabel={`Search`}
                  searchPlaceholder='Search in conversion units'
                  selectionLabel='Select conversion units'
                  options={inputSixFilteredUnits}
                  selectedOptions={inputSixSelectedUnits}
                  setSelectedOptions={setInputSixSelectedUnits}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Output unit select checkbox */}
      {baseUnitStates.isUnitSelect &&
        variableLength >= 1 &&
        !baseUnitStates.outputSelect && (
          <div className='flex items-center mt-3'>
            <div className='form-control'>
              <label
                className='label cursor-pointer'
                htmlFor='use-conversion-for-output'
              >
                <span className='label-text line-clamp-1 mr-3'>
                  Want to use conversion for output?
                </span>
                <input
                  id='use-conversion-for-output'
                  name='use-conversion-for-output'
                  type='checkbox'
                  className='toggle toggle-accent'
                  checked={baseUnitStates.outputSelect}
                  onChange={(e) => {
                    setBaseUnitStates({
                      ...baseUnitStates,
                      outputSelect: e.target.checked,
                    });
                  }}
                />
              </label>
            </div>
          </div>
        )}

      {/* Output select state */}
      {baseUnitStates.outputSelect && (
        <div>
          <div className='mt-3 border-b-[1px] create-border-color rounded-lg rounded-b-none pb-6'>
            <div className='flex items-center justify-between'>
              <p className='text-xl lg:text-2xl  font-semibold '>
                Unit conversion for output
              </p>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {
                  setBaseUnitStates({
                    ...baseUnitStates,
                    outputSelect: false,
                    outputBaseUnit: { value: '', label: '', category: '' },
                  });
                }}
              >
                <IoClose className='text-error' size={25} />
              </button>
            </div>

            <div className='md:grid md:grid-cols-2 md:gap-3 w-full pr-2'>
              <div>
                <SingleSelect
                  id='select-base-unit-for-output'
                  label='Select base unit for output'
                  searchId='search-in-base-unit-for-output'
                  searchLabel='Search'
                  searchPlaceholder='Search in base units'
                  selectionLabel='Select base unit'
                  options={allUnits}
                  selectedOption={outputBaseUnit}
                  setSelectedOption={(value) => {
                    unitStateHandler('outputBaseUnit', value as SelectTypes);
                  }}
                />
              </div>
              <div className='mdMax:mt-3'>
                <MultipleSelect
                  id='select-conversion-units-for-output'
                  label='Select conversion units for output'
                  searchId='search-in-conversion-units-for-output'
                  searchLabel='Search'
                  searchPlaceholder='Search in conversion units'
                  selectionLabel='Select conversion units'
                  options={outputFilteredUnits}
                  selectedOptions={outputSelectedUnits}
                  setSelectedOptions={setOutputSelectedUnits}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitSelect;
