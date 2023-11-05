// Api & Core imports
import React, { FunctionComponent } from 'react';

// Components
import AppInput from '@/components/Shared/Form/AppInput';

// Types
import type { InputLabelTypes } from '@/types/create-calculator.d';
type InputLabelsTypes = {
  formulaVariables: string[];
  labelStates: InputLabelTypes;
  setLabelStates: React.Dispatch<React.SetStateAction<InputLabelTypes>>;
};

const InputLabels: FunctionComponent<InputLabelsTypes> = ({
  formulaVariables,
  labelStates,
  setLabelStates,
}) => {
  const variableLength = formulaVariables.length;

  // Destructure label states
  const { inputOne, inputTwo, inputThree, inputFour, inputFive, inputSix } =
    labelStates;

  // Blur handler
  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // find input id
    const inputId = e.target.id;

    // Check if input label is empty
    if (!e.target.value) {
      setLabelStates({
        ...labelStates,
        [inputId]: {
          ...labelStates[inputId],
          error: 'Label is required',
        },
      });
    }
    /* 
    // Check if input label has more than 32 characters
    if (String(e.target.value).length > 32) {
      setLabelStates({
        ...labelStates,
        [inputId]: {
          ...labelStates[inputId],
          error: 'Maximum allowed length is 32',
        },
      });
    } */
  };

  return (
    <div>
      {variableLength >= 1 && (
        <div className={`grid ${variableLength > 1 && 'grid-cols-2 gap-3 '}`}>
          <div className='mt-3'>
            <AppInput
              id='inputOne'
              name='input-one'
              label={`Label for input "${formulaVariables[0]}"`}
              type='text'
              placeholder={`Enter a label for "${formulaVariables[0]}" input`}
              value={inputOne.value}
              onChange={(e) => {
                setLabelStates({
                  ...labelStates,
                  inputOne: {
                    value: e.target.value,
                    error: '',
                  },
                });
              }}
              onBlur={blurHandler}
              error={inputOne.error}
            />
          </div>
          {variableLength >= 2 && (
            <div className='mt-3'>
              <AppInput
                id='inputTwo'
                name='input-two'
                label={`Label for input "${formulaVariables[1]}"`}
                type='text'
                placeholder={`Enter a label for "${formulaVariables[1]}" input`}
                value={inputTwo.value}
                onChange={(e) => {
                  setLabelStates({
                    ...labelStates,
                    inputTwo: {
                      value: e.target.value,
                      error: '',
                    },
                  });
                }}
                onBlur={blurHandler}
                error={inputTwo.error}
              />
            </div>
          )}
          {variableLength >= 3 && (
            <div className={`${variableLength === 3 && 'col-span-2'}`}>
              <AppInput
                id='inputThree'
                name='input-three'
                label={`Label for input "${formulaVariables[2]}"`}
                type='text'
                placeholder={`Enter a label for "${formulaVariables[2]}" input`}
                value={inputThree.value}
                onChange={(e) => {
                  setLabelStates({
                    ...labelStates,
                    inputThree: {
                      value: e.target.value,
                      error: '',
                    },
                  });
                }}
                onBlur={blurHandler}
                error={inputThree.error}
              />
            </div>
          )}
          {variableLength >= 4 && (
            <div className=''>
              <AppInput
                id='inputFour'
                name='input-four'
                label={`Label for input "${formulaVariables[3]}"`}
                type='text'
                placeholder={`Enter a label for "${formulaVariables[3]}" input`}
                value={inputFour.value}
                onChange={(e) => {
                  setLabelStates({
                    ...labelStates,
                    inputFour: {
                      value: e.target.value,
                      error: '',
                    },
                  });
                }}
                onBlur={blurHandler}
                error={inputFour.error}
              />
            </div>
          )}
          {variableLength >= 5 && (
            <div className={`${variableLength === 5 && 'col-span-2'}`}>
              <AppInput
                id='inputFive'
                name='input-five'
                label={`Label for input "${formulaVariables[4]}"`}
                type='text'
                placeholder={`Enter a label for "${formulaVariables[4]}" input`}
                value={inputFive.value}
                onChange={(e) => {
                  setLabelStates({
                    ...labelStates,
                    inputFive: {
                      value: e.target.value,
                      error: '',
                    },
                  });
                }}
                onBlur={blurHandler}
                error={inputFive.error}
              />
            </div>
          )}
          {variableLength >= 6 && (
            <div className=''>
              <AppInput
                id='inputSix'
                name='input-six'
                label={`Label for input "${formulaVariables[5]}"`}
                type='text'
                placeholder={`Enter a label for "${formulaVariables[5]}" input`}
                value={inputSix.value}
                onChange={(e) => {
                  setLabelStates({
                    ...labelStates,
                    inputSix: {
                      value: e.target.value,
                      error: '',
                    },
                  });
                }}
                onBlur={blurHandler}
                error={inputSix.error}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputLabels;
