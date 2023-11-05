// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function LiterVolumeConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'liter') {
    return value;
  }
  if (targetUnit === 'milliliter') {
    return value * 1000;
  }
  if (targetUnit === 'cubic-meter') {
    return value / 1000;
  }
  if (targetUnit === 'cubic-centimeter') {
    return value * 1000;
  }
  if (targetUnit === 'cubic-inch') {
    return value * 61.0237441;
  }
  if (targetUnit === 'cubic-foot') {
    return value * 0.0353146667;
  }
  if (targetUnit === 'gallon') {
    return value * 0.264172052;
  }
  if (targetUnit === 'quart') {
    return value * 1.05668821;
  }
  if (targetUnit === 'pint') {
    return value * 2.11337642;
  }
  if (targetUnit === 'fluid-ounce') {
    return value * 33.8140227;
  }
  if (targetUnit === 'barrel') {
    return value * 0.00628981077;
  }
  if (targetUnit === 'hogshead') {
    return value * 0.00209660359;
  }
  if (targetUnit === 'teaspoon') {
    return value * 202.884136;
  }
  if (targetUnit === 'tablespoon') {
    return value * 67.6280454;
  }
}
