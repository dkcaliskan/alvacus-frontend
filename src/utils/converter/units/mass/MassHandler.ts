import { KilogramMassConverter } from './KilogramMassConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function MassHandler({ baseUnit, targetUnit, value }: UnitHandlerTypes) {
  if (baseUnit === 'kilogram') {
    return KilogramMassConverter({ targetUnit, value });
  }
  if (baseUnit === 'gram') {
    const kilogramValue = value / 1000;
    return KilogramMassConverter({ targetUnit, value: kilogramValue });
  }
  if (baseUnit === 'milligram') {
    const kilogramValue = value / 1000000;
    return KilogramMassConverter({ targetUnit, value: kilogramValue });
  }
  if (baseUnit === 'microgram') {
    const kilogramValue = value / 1000000000;
    return KilogramMassConverter({ targetUnit, value: kilogramValue });
  }
  if (baseUnit === 'tonne') {
    const kilogramValue = value * 1000;
    return KilogramMassConverter({ targetUnit, value: kilogramValue });
  }
  if (baseUnit === 'ounce') {
    const kilogramValue = value / 35.2739619;
    return KilogramMassConverter({ targetUnit, value: kilogramValue });
  }
  if (baseUnit === 'pound') {
    const kilogramValue = value / 2.20462262;
    return KilogramMassConverter({ targetUnit, value: kilogramValue });
  }
  if (baseUnit === 'stone') {
    const kilogramValue = value / 0.157473044;
    return KilogramMassConverter({ targetUnit, value: kilogramValue });
  }
}
