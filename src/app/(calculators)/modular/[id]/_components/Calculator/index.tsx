// Api & Core imports
import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Dynamic imports
const OneInput = dynamic(() => import('./OneInput'));
const TwoInput = dynamic(() => import('./TwoInput'));
const ThreeInput = dynamic(() => import('./ThreeInput'));
const FourInput = dynamic(() => import('./FourInput'));
const FiveInput = dynamic(() => import('./FiveInput'));
const SixInput = dynamic(() => import('./SixInput'));

// Types
import type {
  ModularInputLabelsTypes,
  ModularSelectTypes,
} from '@/types/calculators.d';

type ModularCalculatorTypes = {
  formula: string;
  formulaLength: number;
  inputLabels: ModularInputLabelsTypes;
  inputSelects: ModularSelectTypes;
};

const ModularCalculator: FunctionComponent<ModularCalculatorTypes> = ({
  formula,
  formulaLength,
  inputLabels,
  inputSelects,
}) => {
  // If formula length is 1, render OneInput component
  if (formulaLength === 1) {
    return (
      <OneInput
        formula={formula}
        inputLabels={inputLabels}
        inputSelects={inputSelects}
      />
    );
  }

  // If formula length is 2, render TwoInput component
  if (formulaLength === 2) {
    return (
      <TwoInput
        formula={formula}
        inputLabels={inputLabels}
        inputSelects={inputSelects}
      />
    );
  }

  // If formula length is 3, render TwoInput component
  if (formulaLength === 3) {
    return (
      <ThreeInput
        formula={formula}
        inputLabels={inputLabels}
        inputSelects={inputSelects}
      />
    );
  }

  // If formula length is 4, render TwoInput component
  if (formulaLength === 4) {
    return (
      <FourInput
        formula={formula}
        inputLabels={inputLabels}
        inputSelects={inputSelects}
      />
    );
  }

  // If formula length is 5, render TwoInput component
  if (formulaLength === 5) {
    return (
      <FiveInput
        formula={formula}
        inputLabels={inputLabels}
        inputSelects={inputSelects}
      />
    );
  }

  // If formula length is 6, render TwoInput component
  if (formulaLength === 6) {
    return (
      <SixInput
        formula={formula}
        inputLabels={inputLabels}
        inputSelects={inputSelects}
      />
    );
  }

  return (
    <div>
      <Loader />
    </div>
  );
};

export default ModularCalculator;
