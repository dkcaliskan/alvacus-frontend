import { JouleEnergyConverter } from './JouleEnergyConverter';
// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function EnergyHandler({
  baseUnit,
  targetUnit,
  value,
}: UnitHandlerTypes) {
  if (baseUnit === 'joule') {
    return JouleEnergyConverter({ targetUnit, value });
  }
  if (baseUnit === 'kilojoule') {
    const jouleValue = value * 1000;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'megajoule') {
    const jouleValue = value * 1000000;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'gigajoule') {
    const jouleValue = value * 1000000000;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'calorie') {
    const jouleValue = value * 4.184;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'kilocalorie') {
    const jouleValue = value * 4184;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'british-thermal-unit') {
    const jouleValue = value * 1055.05585;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'electronvolt') {
    const jouleValue = value * 1.602176634e-19;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'watt-hour') {
    const jouleValue = value * 3600;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'kilowatt-hour') {
    const jouleValue = value * 3600000;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
  if (baseUnit === 'megawatt-hour') {
    const jouleValue = value * 3600000000;
    return JouleEnergyConverter({ targetUnit, value: jouleValue });
  }
}
