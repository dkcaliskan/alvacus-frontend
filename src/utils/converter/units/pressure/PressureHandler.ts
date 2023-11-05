import { PascalPressureConverter } from './PascalPressureConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function PressureHandler({
  baseUnit,
  targetUnit,
  value,
}: UnitHandlerTypes) {
  if (baseUnit === 'pascal') {
    return PascalPressureConverter({ targetUnit, value });
  }
  if (baseUnit === 'kilopascal') {
    const pascalValue = value * 1000;
    return PascalPressureConverter({ targetUnit, value: pascalValue });
  }
  if (baseUnit === 'megapascal') {
    const pascalValue = value * 1000000;
    return PascalPressureConverter({ targetUnit, value: pascalValue });
  }
  if (baseUnit === 'bar') {
    const pascalValue = value * 100000;
    return PascalPressureConverter({ targetUnit, value: pascalValue });
  }
  if (baseUnit === 'millibar') {
    const pascalValue = value * 100;
    return PascalPressureConverter({ targetUnit, value: pascalValue });
  }
  if (baseUnit === 'psi') {
    const pascalValue = value * 6894.76;
    return PascalPressureConverter({ targetUnit, value: pascalValue });
  }
  if (baseUnit === 'atmosphere') {
    const pascalValue = value * 101325;
    return PascalPressureConverter({ targetUnit, value: pascalValue });
  }
  if (baseUnit === 'torr') {
    const pascalValue = value * 133.322;
    return PascalPressureConverter({ targetUnit, value: pascalValue });
  }
}
