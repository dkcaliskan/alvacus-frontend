import { conversionHandler } from './convert';

type inputConversionTypes = {
  inputStates: { value: string | number; label: string };
  selectBaseUnit?: { value: string; category: string };
  selectTargetUnit?: string;
};

export function inputConversion({
  inputStates,
  selectBaseUnit,
  selectTargetUnit,
}: inputConversionTypes) {
  // If select is needed return converted value
  if (selectTargetUnit && selectBaseUnit) {
    // Convert value
    const convertedValue = conversionHandler({
      baseUnit: selectBaseUnit.value,
      targetUnit: selectTargetUnit,
      value: inputStates.value as number,
      category: selectBaseUnit.category,
    });

    // Return converted value or empty string
    return convertedValue || '';
  }

  // If select is not needed return input value
  return inputStates.value;
}
