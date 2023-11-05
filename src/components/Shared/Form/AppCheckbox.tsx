// Api & Core imports
import React, { FunctionComponent } from 'react';

// Types
type AppCheckboxTypes = {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
};

const AppCheckbox: FunctionComponent<AppCheckboxTypes> = ({
  id,
  label,
  value,
  checked,
  onChange,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onChange(value, isChecked);
  };

  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        id={id}
        className='checkbox'
        checked={checked}
        value={value}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={id} className='label pl-3 cursor-pointer'>
        {label}
      </label>
    </div>
  );
};

export default AppCheckbox;
