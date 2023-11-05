import { CelsiusTemperatureConverter } from './CelsiusTemperatureConverter';

// Types
import { UnitHandlerTypes } from '@/types/converter.d';

export function TemperatureHandler({
  baseUnit,
  targetUnit,
  value,
}: UnitHandlerTypes) {
  if (baseUnit === 'celsius') {
    return CelsiusTemperatureConverter({ targetUnit, value });
  }
  if (baseUnit === 'fahrenheit') {
    const celsiusValue = (value - 32) * (5 / 9);
    return CelsiusTemperatureConverter({
      targetUnit,
      value: celsiusValue,
    });

  }
  if (baseUnit === 'kelvin') {
    const celsiusValue = value - 273.15;
    return CelsiusTemperatureConverter({
      targetUnit,
      value: celsiusValue,
    });

  }
  if (baseUnit === 'rankine') {
    const celsiusValue = (value - 491.67) * (5 / 9);
    return CelsiusTemperatureConverter({
      targetUnit,
      value: celsiusValue,
    });

  }
  if (baseUnit === 'delisle') {
    const celsiusValue = (100 - value) * (2 / 3);
    return CelsiusTemperatureConverter({
      targetUnit,
      value: celsiusValue,
    });

  }
  if (baseUnit === 'newton') {
    const celsiusValue = value * (100 / 33);
    return CelsiusTemperatureConverter({
      targetUnit,
      value: celsiusValue,
    });

  }
  if (baseUnit === 'reaumur') {
    const celsiusValue = value * (5 / 4);
    return CelsiusTemperatureConverter({
      targetUnit,
      value: celsiusValue,
    });

   
  }
  if (baseUnit === 'romer') {
    const celsiusValue = (value - 7.5) * (40 / 21);
    return CelsiusTemperatureConverter({
      targetUnit,
      value: celsiusValue,
    });

  }
}
