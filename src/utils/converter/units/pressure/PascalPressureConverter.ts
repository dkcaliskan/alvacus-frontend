// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function PascalPressureConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'pascal') {
    return value;
  }
  if (targetUnit === 'kilopascal') {
    return value / 1000;
  }
  if (targetUnit === 'megapascal') {
    return value / 1000000;
  }
  if (targetUnit === 'bar') {
    return value / 100000;
  }
  if (targetUnit === 'millibar') {
    return value / 100;
  }
  if (targetUnit === 'psi') {
    return value / 6894.76;
  }
  if (targetUnit === 'atmosphere') {
    return value / 101325;
  }
  if (targetUnit === 'torr') {
    return value / 133.322;
  }
  return 0;
}
