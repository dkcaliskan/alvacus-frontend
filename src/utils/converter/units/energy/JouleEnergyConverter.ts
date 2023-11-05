// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function JouleEnergyConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'joule') {
    return value;
  }
  if (targetUnit === 'kilojoule') {
    return value / 1000;
  }
  if (targetUnit === 'megajoule') {
    return value / 1000000;
  }
  if (targetUnit === 'gigajoule') {
    return value / 1000000000;
  }
  if (targetUnit === 'calorie') {
    return value / 4.184;
  }
  if (targetUnit === 'kilocalorie') {
    return value / 4184;
  }
  if (targetUnit === 'british-thermal-unit') {
    return value / 1055.05585;
  }
  if (targetUnit === 'electronvolt') {
    return value / 1.602176634e-19;
  }
  if (targetUnit === 'watt-hour') {
    return value / 3600;
  }
  if (targetUnit === 'kilowatt-hour') {
    return value / 3600000;
  }
  if (targetUnit === 'megawatt-hour') {
    return value / 3600000000;
  }
}
