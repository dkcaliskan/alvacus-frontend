export type UnitConversionTypes = {
  targetUnit: string;
  value: number;
};

export type UnitHandlerTypes = {
  baseUnit: string;
  targetUnit: string;
  value: number;
};

type ConversionHandlerTypes = {
  baseUnit: string;
  targetUnit: string;
  value: number;
  category: string;
};
