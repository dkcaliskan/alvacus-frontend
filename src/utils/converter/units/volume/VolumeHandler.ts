import { LiterVolumeConverter } from './LiterVolumeConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function VolumeHandler({
  baseUnit,
  targetUnit,
  value,
}: UnitHandlerTypes) {
  if (baseUnit === 'liter') {
    return LiterVolumeConverter({ targetUnit, value });
  }
  if (baseUnit === 'milliliter') {
    const literValue = value / 1000;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'cubic-meter') {
    const literValue = value * 1000;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'cubic-centimeter') {
    const literValue = value / 1000;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'cubic-inch') {
    const literValue = value / 61.0237441;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'cubic-foot') {
    const literValue = value / 0.0353146667;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'gallon') {
    const literValue = value / 0.264172052;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'quart') {
    const literValue = value / 1.05668821;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'pint') {
    const literValue = value / 2.11337642;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'fluid-ounce') {
    const literValue = value / 33.8140227;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'barrel') {
    const literValue = value / 0.00628981077;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'hogshead') {
    const literValue = value / 0.00209660359;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'teaspoon') {
    const literValue = value / 202.884136;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
  if (baseUnit === 'tablespoon') {
    const literValue = value / 67.6280454;
    return LiterVolumeConverter({ targetUnit, value: literValue });
  }
}
