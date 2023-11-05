import { SecondTimeConverter } from './SecondTimeConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function TimeHandler({ baseUnit, targetUnit, value }: UnitHandlerTypes) {
  if (baseUnit === 'second') {
    return SecondTimeConverter({ targetUnit, value });
  }
  if (baseUnit === 'millisecond') {
    const secondValue = value / 1000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'microsecond') {
    const secondValue = value / 1000000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'nanosecond') {
    const secondValue = value / 1000000000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'minute') {
    const secondValue = value * 60;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'hour') {
    const secondValue = value * 3600;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'day') {
    const secondValue = value * 86400;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'week') {
    const secondValue = value * 604800;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'month') {
    const secondValue = value * 2628000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'year') {
    const secondValue = value * 31536000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'decade') {
    const secondValue = value * 315360000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'century') {
    const secondValue = value * 3153600000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
  if (baseUnit === 'millennium') {
    const secondValue = value * 31536000000;
    return SecondTimeConverter({
      targetUnit,
      value: secondValue,
    });
  }
}
