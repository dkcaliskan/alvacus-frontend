'use client';

// Api & Core imports
import React, { FunctionComponent, useState } from 'react';

// Components
import AppInput from '@/components/Shared/Form/AppInput';

// Types
import type { FormulaStatesTypes } from '@/types/create-calculator.d';
type FormulaInputTypes = {
  formulaStates: FormulaStatesTypes;
  setFormulaStates: React.Dispatch<React.SetStateAction<FormulaStatesTypes>>;
};

const FormulaInput: FunctionComponent<FormulaInputTypes> = ({
  formulaStates,
  setFormulaStates,
}) => {
  const [variableLength, setVariableLength] = useState(0);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get unique variables
    const uniqueVariables = Array.from(
      new Set(e.target.value.match(/\b[a-zA-Z]\b/g))
    );

    // Set unique variable length
    setVariableLength(uniqueVariables.length);

    // Set formula states
    setFormulaStates({
      value: e.target.value,
      variables: uniqueVariables,
      error: '',
    });
  };

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if formula is empty
    if (!e.target.value) {
      setFormulaStates({
        ...formulaStates,
        error: 'Formula is required',
      });
    }

    // Check if formula has more than 6 variables
    if (variableLength > 6) {
      setFormulaStates({
        ...formulaStates,
        error: 'Formula can only have 6 variables',
      });
    }
  };

  return (
    <div>
      <AppInput
        label='Create your own calculator!'
        id='formula'
        name='formula'
        type='text'
        placeholder='Enter formula'
        value={formulaStates.value}
        onChange={changeHandler}
        onBlur={blurHandler}
        error={formulaStates.error}
      />
    </div>
  );
};

export default FormulaInput;
