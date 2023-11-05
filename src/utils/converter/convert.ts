import { LengthHandler } from './units/length/LengthHandler';
import { MassHandler } from './units/mass/MassHandler';
import { VolumeHandler } from './units/volume/VolumeHandler';
import { TimeHandler } from './units/time/TimeHandler';
import { TemperatureHandler } from './units/temperature/TemperatureHandler';
import { AreaHandler } from './units/area/AreaHandler';
import { EnergyHandler } from './units/energy/EnergyHandler';
import { ElectricHandler } from './units/electric/ElectricHandler';
import { FrequencyHandler } from './units/frequency/FrequencyHandler';
import { PressureHandler } from './units/pressure/PressureHandler';

// Types
import { ConversionHandlerTypes } from '@/types/converter.d';

export function conversionHandler({
  baseUnit,
  targetUnit,
  value,
  category,
}: ConversionHandlerTypes) {
  if (baseUnit === targetUnit) return value;

  if (category === 'length') {
    return LengthHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'mass') {
    return MassHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'volume') {
    return VolumeHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'time') {
    return TimeHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'temperature') {
    return TemperatureHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'area') {
    return AreaHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'energy') {
    return EnergyHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'electric') {
    return ElectricHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'frequency') {
    return FrequencyHandler({ baseUnit, targetUnit, value });
  }
  if (category === 'pressure') {
    return PressureHandler({ baseUnit, targetUnit, value });
  } else {
    return value;
  }
}
