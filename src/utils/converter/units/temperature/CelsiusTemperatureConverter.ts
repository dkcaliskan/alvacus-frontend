// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function CelsiusTemperatureConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'celsius') {
    return value;
  }
  if (targetUnit === 'fahrenheit') {
    return (value * 9) / 5 + 32;
  }
  if (targetUnit === 'kelvin') {
    return value + 273.15;
  }
  if (targetUnit === 'rankine') {
    return (value + 273.15) * 1.8;
  }
  if (targetUnit === 'delisle') {
    return (100 - value) * 1.5;
  }
  if (targetUnit === 'newton') {
    return value * 0.33;
  }
  if (targetUnit === 'reaumur') {
    return value * 0.8;
  }
  if (targetUnit === 'romer') {
    return (value * 21) / 40 + 7.5;
  }
  return 0;
}
