// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function SquareMeterAreaConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'square-meter') {
    return value;
  }
  if (targetUnit === 'square-kilometer') {
    return value / 1000000;
  }
  if (targetUnit === 'square-centimeter') {
    return value * 10000;
  }
  if (targetUnit === 'square-millimeter') {
    return value * 1000000;
  }
  if (targetUnit === 'hectare') {
    return value / 10000;
  }
  if (targetUnit === 'acre') {
    return value / 4046.85642;
  }
  if (targetUnit === 'square-mile') {
    return value / 2589988.11;
  }
  if (targetUnit === 'square-yard') {
    return value * 1.19599;
  }
  if (targetUnit === 'square-foot') {
    return value * 10.7639;
  }
  if (targetUnit === 'square-inch') {
    return value * 1550;
  }
}
