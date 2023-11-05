// Utils
import { conversionHandler } from '@/utils/converter/convert';

// Types
type ApothemFunctionTypes = {
  shape: string;
  sideLength: number;
  fixedLength?: number;
};

export default function apothemFunction({
  shape,
  sideLength,
  fixedLength = 6,
}: ApothemFunctionTypes) {
  const pyramidShapes: { [key: string]: number } = {
    triangular: 3,
    square: 4,
    pentagonal: 5,
    hexagonal: 6,
    heptagonal: 7,
    octagonal: 8,
  };

  const convertToCm = (value: number, unit: string) => {
    if (unit === 'centimeter') return value;

    return conversionHandler({
      baseUnit: unit,
      targetUnit: 'centimeter',
      value,
      category: 'length',
    }) as number;
  };

  /* const convertApothem = (value: number, fromUnit: string, toUnit: string) => {
    if (fromUnit === toUnit) return Number(value.toFixed(fixedLength));

    const convertedValue = convertToCm(value, fromUnit);

    const convertedApothem = conversionHandler({
      baseUnit: 'centimeter',
      targetUnit: toUnit,
      value: convertedValue,
      category: 'length',
    }) as number;

    return Number(convertedApothem.toFixed(fixedLength));
  }; */

  /* const centimeterSideLength = convertToCm(sideLength, sideLengthUnit); */
  const calculatedValue =
    sideLength / (2 * Math.tan(Math.PI / pyramidShapes[shape]));
  /* const convertedApothem = convertApothem(
    apothemFormula,
    'centimeter',
    apothemSelectedUnit
  ); */

  return Number.isNaN(calculatedValue)
    ? 0
    : calculatedValue.toFixed(fixedLength);
}
