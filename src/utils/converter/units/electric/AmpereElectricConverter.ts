// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function AmpereElectricConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'ampere') {
    return value;
  }
  if (targetUnit === 'milliampere') {
    return value * 1000;
  }
  if (targetUnit === 'microampere') {
    return value * 1000000;
  }
  if (targetUnit === 'nanoampere') {
    return value * 1000000000;
  }
  if (targetUnit === 'picoampere') {
    return value * 1000000000000;
  }
  if (targetUnit === 'kiloampere') {
    return value / 1000;
  }
  if (targetUnit === 'megaampere') {
    return value / 1000000;
  }
  if (targetUnit === 'gigaampere') {
    return value / 1000000000;
  }
  if (targetUnit === 'gilbert') {
    return value / 0.795774715;
  }
}
