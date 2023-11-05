// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function KilogramMassConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'kilogram') {
    return value;
  }
  if (targetUnit === 'gram') {
    return value * 1000;
  }
  if (targetUnit === 'milligram') {
    return value * 1000000;
  }
  if (targetUnit === 'microgram') {
    return value * 1000000000;
  }
  if (targetUnit === 'tonne') {
    return value / 1000;
  }
  if (targetUnit === 'ounce') {
    return value * 35.2739619;
  }
  if (targetUnit === 'pound') {
    return value * 2.20462262;
  }
  if (targetUnit === 'stone') {
    return value * 0.157473044;
  }
}
