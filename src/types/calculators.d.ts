type SavedUserTypes = {
  userId: string;
};

export type SelectUnitTypes = {
  label: string;
  value: string;
  category: string;
};

export type ModularSelectTypes = {
  isUnitSelect: boolean;
  inputOneSelect: boolean;
  inputOneBaseUnit?: SelectUnitTypes;
  inputOneSelectedUnits?: SelectUnitTypes[];
  inputTwoSelect: boolean;
  inputTwoBaseUnit?: SelectUnitTypes;
  inputTwoSelectedUnits?: SelectUnitTypes[];
  inputThreeSelect: boolean;
  inputThreeBaseUnit?: SelectUnitTypes;
  inputThreeSelectedUnits?: SelectUnitTypes[];
  inputFourSelect: boolean;
  inputFourBaseUnit?: SelectUnitTypes;
  inputFourSelectedUnits?: SelectUnitTypes[];
  inputFiveSelect: boolean;
  inputFiveBaseUnit?: SelectUnitTypes;
  inputFiveSelectedUnits?: SelectUnitTypes[];
  inputSixSelect: boolean;
  inputSixBaseUnit?: SelectUnitTypes;
  inputSixSelectedUnits?: SelectUnitTypes[];
  outputSelect: boolean;
  outputBaseUnit?: SelectUnitTypes;
  outputSelectedUnits?: SelectUnitTypes[];
};

export type ModularInputLabelsTypes = {
  inputOneLabel: string;
  inputTwoLabel: string;
  inputThreeLabel: string;
  inputFourLabel: string;
  inputFiveLabel: string;
  inputSixLabel: string;
  outputLabel: string;
};

export type CalculatorTypes = {
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  author?: {
    _id: string;
    avatar: string;
    username: string;
    profession: string;
    company: string;
  };
  type: string;
  isVerified: boolean;
  _id: string;
  savedUsers: SavedUserTypes[];
  inputLength: number;
  formula: string;
  formulaVariables: string[];
  inputLabels: ModularInputLabelsTypes;
  isInfoMarkdown: boolean;
  inputSelects: InputSelectsSchema;
  info: string;
};

export type CalculatorCardTypes = {
  calculator: CalculatorTypes;
  userId?: string | string[] | undefined;
};

export type SearchCalcTypes = {
  page?: string | number | string[];
  sortType?: string | number | string[];
  search?: string | number | string[];
  tag?: string | number | string[];
  userId?: string | number | string[];
  limit?: string | number | string[];
};
