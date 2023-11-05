// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function HertzFrequencyConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'hertz') {
    return value;
  }
  if (targetUnit === 'kilohertz') {
    return value / 1000;
  }
  if (targetUnit === 'megahertz') {
    return value / 1000000;
  }
  if (targetUnit === 'gigahertz') {
    return value / 1000000000;
  }
  if (targetUnit === 'terahertz') {
    return value / 1000000000000;
  }
  if (targetUnit === 'petahertz') {
    return value / 1000000000000000;
  }
  if (targetUnit === 'revolutions-per-minute') {
    return value * 60;
  }
}
