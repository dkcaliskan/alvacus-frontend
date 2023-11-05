// Api & Core imports
import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports
const OneInput = dynamic(
  () => import('../modular/[id]/_components/Calculator/OneInput')
);
const TwoInput = dynamic(
  () => import('../modular/[id]/_components/Calculator/TwoInput')
);
const ThreeInput = dynamic(
  () => import('../modular/[id]/_components/Calculator/ThreeInput')
);
const FourInput = dynamic(
  () => import('../modular/[id]/_components/Calculator/FourInput')
);
const FiveInput = dynamic(
  () => import('../modular/[id]/_components/Calculator/FiveInput')
);
const SixInput = dynamic(
  () => import('../modular/[id]/_components/Calculator/SixInput')
);

// Types
import type {
  ModularInputLabelsTypes,
  ModularSelectTypes,
} from '@/types/calculators.d';
type ModularCalculatorTypes = {
  formula: string;
  formulaLength: number;
  inputOneLabel: string;
  inputTwoLabel: string;
  inputThreeLabel: string;
  inputFourLabel: string;
  inputFiveLabel: string;
  inputSixLabel: string;
  outputLabel: string;
  inputSelects: ModularSelectTypes;
};

const Preview: FunctionComponent<ModularCalculatorTypes> = ({
  formula,
  formulaLength,
  inputOneLabel,
  inputTwoLabel,
  inputThreeLabel,
  inputFourLabel,
  inputFiveLabel,
  inputSixLabel,
  outputLabel,
  inputSelects,
}) => {
  const inputLabels = {
    inputOneLabel,
    inputTwoLabel,
    inputThreeLabel,
    inputFourLabel,
    inputFiveLabel,
    inputSixLabel,
    outputLabel,
  };
  // If formula length is 1, render OneInput component
  if (formulaLength === 1) {
    return (
      <div className='custom-bg-color pt-3 pb-6 px-1.5 lg:px-3 rounded-lg lg:rounded-box mt-3'>
        <div>
          <h2 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
            Preview
          </h2>
        </div>
        <OneInput
          formula={formula}
          inputLabels={inputLabels}
          inputSelects={inputSelects}
        />
      </div>
    );
  }

  // If formula length is 2, render TwoInput component
  if (formulaLength === 2) {
    return (
      <div className='custom-bg-color pt-3 pb-6 px-1.5 lg:px-3 rounded-lg lg:rounded-box mt-3'>
        <div>
          <h2 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
            Preview
          </h2>
        </div>
        <TwoInput
          formula={formula}
          inputLabels={inputLabels}
          inputSelects={inputSelects}
        />
      </div>
    );
  }

  // If formula length is 3, render TwoInput component
  if (formulaLength === 3) {
    return (
      <div className='custom-bg-color pt-3 pb-6 px-1.5 lg:px-3 rounded-lg lg:rounded-box mt-3'>
        <div>
          <h2 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
            Preview
          </h2>
        </div>
        <ThreeInput
          formula={formula}
          inputLabels={inputLabels}
          inputSelects={inputSelects}
        />
      </div>
    );
  }

  // If formula length is 4, render TwoInput component
  if (formulaLength === 4) {
    return (
      <div className='custom-bg-color pt-3 pb-6 px-1.5 lg:px-3 rounded-lg lg:rounded-box mt-3'>
        <div>
          <h2 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
            Preview
          </h2>
        </div>
        <FourInput
          formula={formula}
          inputLabels={inputLabels}
          inputSelects={inputSelects}
        />
      </div>
    );
  }

  // If formula length is 5, render TwoInput component
  if (formulaLength === 5) {
    return (
      <div className='custom-bg-color pt-3 pb-6 px-1.5 lg:px-3 rounded-lg lg:rounded-box mt-3'>
        <div>
          <h2 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
            Preview
          </h2>
        </div>
        <FiveInput
          formula={formula}
          inputLabels={inputLabels}
          inputSelects={inputSelects}
        />
      </div>
    );
  }

  // If formula length is 6, render TwoInput component
  if (formulaLength === 6) {
    return (
      <div className='custom-bg-color pt-3 pb-6 px-1.5 lg:px-3 rounded-lg lg:rounded-box mt-3'>
        <div>
          <h2 className='text-2xl lg:text-3xl font-semibold lgMax:text-center'>
            Preview
          </h2>
        </div>
        <SixInput
          formula={formula}
          inputLabels={inputLabels}
          inputSelects={inputSelects}
        />
      </div>
    );
  }

  return <div>Preview</div>;
};

export default Preview;
