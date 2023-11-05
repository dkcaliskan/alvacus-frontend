import { AmpereElectricConverter } from './AmpereElectricConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function ElectricHandler({
  baseUnit,
  targetUnit,
  value,
}: UnitHandlerTypes) {
  if (baseUnit === 'ampere') {
    return AmpereElectricConverter({ targetUnit, value });
  }
  if (baseUnit === 'milliampere') {
    const ampereValue = value / 1000;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
  if (baseUnit === 'microampere') {
    const ampereValue = value / 1000000;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
  if (baseUnit === 'nanoampere') {
    const ampereValue = value / 1000000000;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
  if (baseUnit === 'picoampere') {
    const ampereValue = value / 1000000000000;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
  if (baseUnit === 'kiloampere') {
    const ampereValue = value * 1000;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
  if (baseUnit === 'megaampere') {
    const ampereValue = value * 1000000;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
  if (baseUnit === 'gigaampere') {
    const ampereValue = value * 1000000000;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
  if (baseUnit === 'gilbert') {
    const ampereValue = value * 0.795774715;
    return AmpereElectricConverter({ targetUnit, value: ampereValue });
  }
}
