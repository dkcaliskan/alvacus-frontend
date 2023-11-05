export type FormulaStatesTypes = {
  value: string;
  variables: string[];
  error: string;
};

type LabelStatesTypes = {
  value: string;
  error: string;
};

export type SelectTypes = {
  value: string;
  label: string;
  category: string;
};
export type SelectUnitTypes = {
  isUnitSelect: boolean;
  inputOneSelect: boolean;
  inputOneBaseUnit: SelectTypes;
  inputTwoSelect: boolean;
  inputTwoBaseUnit: SelectTypes;
  inputThreeSelect: boolean;
  inputThreeBaseUnit: SelectTypes;
  inputFourSelect: boolean;
  inputFourBaseUnit: SelectTypes;
  inputFiveSelect: boolean;
  inputFiveBaseUnit: SelectTypes;
  inputSixSelect: boolean;
  inputSixBaseUnit: SelectTypes;
  outputSelect: boolean;
  outputBaseUnit: SelectTypes;
};

export type InputLabelTypes = {
  [key?: string]: LabelStatesTypes;
  inputOne: LabelStates;
  inputTwo: LabelStates;
  inputThree: LabelStates;
  inputFour: LabelStates;
  inputFive: LabelStates;
  inputSix: LabelStates;
  output: LabelStates;
};

export type UnitSelectTypes = {
  baseUnitStates: SelectUnitTypes;
  setBaseUnitStates: React.Dispatch<React.SetStateAction<SelectUnitTypes>>;
  formulaVariables: string[];
  inputOneSelectedUnits: SelectTypes[];
  setInputOneSelectedUnits: React.Dispatch<React.SetStateAction<SelectTypes[]>>;
  inputTwoSelectedUnits: SelectTypes[];
  setInputTwoSelectedUnits: React.Dispatch<React.SetStateAction<SelectTypes[]>>;
  inputThreeSelectedUnits: SelectTypes[];
  setInputThreeSelectedUnits: React.Dispatch<
    React.SetStateAction<SelectTypes[]>
  >;
  inputFourSelectedUnits: SelectTypes[];
  setInputFourSelectedUnits: React.Dispatch<
    React.SetStateAction<SelectTypes[]>
  >;
  inputFiveSelectedUnits: SelectTypes[];
  setInputFiveSelectedUnits: React.Dispatch<
    React.SetStateAction<SelectTypes[]>
  >;
  inputSixSelectedUnits: SelectTypes[];
  setInputSixSelectedUnits: React.Dispatch<React.SetStateAction<SelectTypes[]>>;
  outputSelectedUnits: SelectTypes[];
  setOutputSelectedUnits: React.Dispatch<React.SetStateAction<SelectTypes[]>>;
};
