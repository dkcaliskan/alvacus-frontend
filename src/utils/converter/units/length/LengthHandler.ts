import { MeterLengthConverter } from './MeterLengthConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function LengthHandler({
  baseUnit,
  targetUnit,
  value,
}: UnitHandlerTypes) {
  if (baseUnit === 'meter') {
    return MeterLengthConverter({ targetUnit, value });
  }
  if (baseUnit === 'kilometer') {
    const meterValue = value * 1000;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'centimeter') {
    const meterValue = value / 100;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'millimeter') {
    const meterValue = value / 1000;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'micrometer') {
    const meterValue = value / 1000000;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'nanometer') {
    const meterValue = value / 1000000000;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'inch') {
    const meterValue = value / 39.3700787;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'foot') {
    const meterValue = value / 3.2808399;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'yard') {
    const meterValue = value / 1.0936133;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'mile') {
    const meterValue = value * 1609.344;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'nautical-mile') {
    const meterValue = value * 1852;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'angstrom') {
    const meterValue = value / 10000000000;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'fathom') {
    const meterValue = value * 1.829;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'hand') {
    const meterValue = value / 0.1016;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'light-year') {
    const meterValue = value * 9460730472580800;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'parsec') {
    const meterValue = value * 30856775814913600;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'rod') {
    const meterValue = value * 5.0292;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'chain') {
    const meterValue = value / 0.0497097;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'astronomical-unit') {
    const meterValue = value * 149597870700;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  }
  if (baseUnit === 'ell') {
    const meterValue = value * 1.143;
    return MeterLengthConverter({ targetUnit, value: meterValue });
  } else {
    return value;
  }
}
