// Types
import { UnitConversionTypes } from '@/types/converter.d';

export function SecondTimeConverter({
  targetUnit,
  value,
}: UnitConversionTypes) {
  if (targetUnit === 'second') {
    return value;
  }
  if (targetUnit === 'millisecond') {
    return value * 1000;
  }
  if (targetUnit === 'microsecond') {
    return value * 1000000;
  }
  if (targetUnit === 'nanosecond') {
    return value * 1000000000;
  }
  if (targetUnit === 'minute') {
    return value / 60;
  }
  if (targetUnit === 'hour') {
    return value / 3600;
  }
  if (targetUnit === 'day') {
    return value / 86400;
  }
  if (targetUnit === 'week') {
    return value / 604800;
  }
  if (targetUnit === 'month') {
    return value / 2628000;
  }
  if (targetUnit === 'year') {
    return value / 31536000;
  }
  if (targetUnit === 'decade') {
    return value / 315360000;
  }
  if (targetUnit === 'century') {
    return value / 3153600000;
  }
  if (targetUnit === 'millennium') {
    return value / 31536000000;
  }
  return 0;
}
