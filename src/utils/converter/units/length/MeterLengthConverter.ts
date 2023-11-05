// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function MeterLengthConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'meter') {
    return value;
  }
  if (targetUnit === 'kilometer') {
    return value / 1000;
  }
  if (targetUnit === 'centimeter') {
    return value * 100;
  }
  if (targetUnit === 'millimeter') {
    return value * 1000;
  }
  if (targetUnit === 'micrometer') {
    return value * 1000000;
  }
  if (targetUnit === 'nanometer') {
    return value * 1000000000;
  }
  if (targetUnit === 'inch') {
    return value * 39.3700787;
  }
  if (targetUnit === 'foot') {
    return value * 3.2808399;
  }
  if (targetUnit === 'yard') {
    return value * 1.0936133;
  }
  if (targetUnit === 'mile') {
    return value / 1609.344;
  }
  if (targetUnit === 'nautical-mile') {
    return value / 1852;
  }
  if (targetUnit === 'angstrom') {
    return value * 10000000000;
  }
  if (targetUnit === 'fathom') {
    return value / 1.829;
  }
  if (targetUnit === 'hand') {
    return value * 0.1016;
  }
  if (targetUnit === 'light-year') {
    return value / 9460730472580800;
  }
  if (targetUnit === 'parsec') {
    return value / 30856775814913600;
  }
  if (targetUnit === 'rod') {
    return value / 5.0292;
  }
  if (targetUnit === 'chain') {
    return value * 0.0497097;
  }
  if (targetUnit === 'astronomical-unit') {
    return value / 149597870700;
  }
  if (targetUnit === 'ell') {
    return value / 1.143;
  }
}
