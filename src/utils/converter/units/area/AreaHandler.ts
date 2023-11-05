import { SquareMeterAreaConverter } from './SquareMeterAreaConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function AreaHandler({ baseUnit, targetUnit, value }: UnitHandlerTypes) {
  if (baseUnit === 'square-meter') {
    return SquareMeterAreaConverter({ targetUnit, value });
  }
  if (baseUnit === 'square-kilometer') {
    const squareMeterValue = value * 1000000;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'square-centimeter') {
    const squareMeterValue = value / 10000;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'square-millimeter') {
    const squareMeterValue = value / 1000000;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'hectare') {
    const squareMeterValue = value * 10000;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'acre') {
    const squareMeterValue = value * 4046.85642;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'square-mile') {
    const squareMeterValue = value * 2589988.11;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'square-yard') {
    const squareMeterValue = value / 1.19599;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'square-foot') {
    const squareMeterValue = value / 10.7639;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
  if (baseUnit === 'square-inch') {
    const squareMeterValue = value / 1550;
    return SquareMeterAreaConverter({ targetUnit, value: squareMeterValue });
  }
}
