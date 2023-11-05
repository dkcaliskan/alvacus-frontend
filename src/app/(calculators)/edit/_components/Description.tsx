// Api & Core imports
import React, { FunctionComponent } from 'react';

// Components
import AppTextarea from '@/components/Shared/Form/AppTextarea';

// Types
type DescriptionInputTypes = {
  descriptionStates: {
    value: string;
    error: string;
  };
  setDescriptionStates: React.Dispatch<
    React.SetStateAction<{
      value: string;
      error: string;
    }>
  >;
};

const DescriptionInput: FunctionComponent<DescriptionInputTypes> = ({
  descriptionStates,
  setDescriptionStates,
}) => {
  const onBlurHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Check if description is empty
    if (!e.target.value) {
      setDescriptionStates({
        ...descriptionStates,
        error: 'Description is required',
      });
    }
  };

  return (
    <div>
      <AppTextarea
        label='Description'
        id='description'
        placeholder='Enter a brief description of your formula'
        value={descriptionStates.value}
        onChange={(e) =>
          setDescriptionStates({
            ...descriptionStates,
            value: e.target.value,
          })
        }
        onBlur={onBlurHandler}
        customStyle='h-40'
        error={descriptionStates.error}
      />
    </div>
  );
};

export default DescriptionInput;
