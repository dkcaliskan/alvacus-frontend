import { HertzFrequencyConverter } from './HertzFrequencyConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function FrequencyHandler({
  baseUnit,
  targetUnit,
  value,
}: UnitHandlerTypes) {
  if (baseUnit === 'hertz') {
    return HertzFrequencyConverter({ targetUnit, value });
  }
  if (baseUnit === 'kilohertz') {
    const hertzValue = value * 1000;
    return HertzFrequencyConverter({ targetUnit, value: hertzValue });
  }
  if (baseUnit === 'megahertz') {
    const hertzValue = value * 1000000;
    return HertzFrequencyConverter({ targetUnit, value: hertzValue });
  }
  if (baseUnit === 'gigahertz') {
    const hertzValue = value * 1000000000;
    return HertzFrequencyConverter({ targetUnit, value: hertzValue });
  }
  if (baseUnit === 'terahertz') {
    const hertzValue = value * 1000000000000;
    return HertzFrequencyConverter({ targetUnit, value: hertzValue });
  }
  if (baseUnit === 'petahertz') {
    const hertzValue = value * 1000000000000000;
    return HertzFrequencyConverter({ targetUnit, value: hertzValue });
  }
  if (baseUnit === 'revolutions-per-minute') {
    const hertzValue = value / 60;
    return HertzFrequencyConverter({ targetUnit, value: hertzValue });
  }
}
