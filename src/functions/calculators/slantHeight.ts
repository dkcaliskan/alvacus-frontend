// Utils
import { conversionHandler } from '@/utils/converter/convert';

// Types
type SlantHeightFunctionTypes = {
  shape: string;
  customPyramidShapeSize: number;
  sideLength: number;
  height: number;
  fixedLength?: number;
};

export default function SlantHeightFunction({
  shape,
  customPyramidShapeSize,
  sideLength,
  height,
  fixedLength = 6,
}: SlantHeightFunctionTypes) {
  const pyramidShapes: { [key: string]: number } = {
    triangular: 3,
    square: 4,
    pentagonal: 5,
    hexagonal: 6,
    heptagonal: 7,
    octagonal: 8,
    custom: customPyramidShapeSize,
  };

  /*  const convertToCm = (value: number, unit: string) => {
    if (unit === 'centimeter') return value;

    return conversionHandler({
      baseUnit: unit,
      targetUnit: 'centimeter',
      value,
      category: 'length',
    }) as number;
  };

  const convertSlantHeight = (
    value: number,
    fromUnit: string,
    toUnit: string
  ) => {
    if (fromUnit === toUnit) return Number(value.toFixed(fixedLength));

    const convertedValue = convertToCm(value, fromUnit);

    const convertedSlantHeight = conversionHandler({
      baseUnit: 'centimeter',
      targetUnit: toUnit,
      value: convertedValue,
      category: 'length',
    }) as number;

    return Number(convertedSlantHeight.toFixed(fixedLength));
  };

  const centimeterSideLength = convertToCm(sideLength, sideLengthUnit);
  const centimeterHeight = convertToCm(height, heightUnit); */
  const apothemFormula =
    sideLength / (2 * Math.tan(Math.PI / pyramidShapes[shape]));
  const slantHeightFormula = Math.sqrt(apothemFormula ** 2 + height ** 2);

  /* const convertedSlantHeight = convertSlantHeight(
    slantHeightFormula,
    'centimeter',
    slantHeightSelectedUnit
  ); */

  return Number.isNaN(slantHeightFormula)
    ? 0
    : slantHeightFormula.toFixed(fixedLength);
}
