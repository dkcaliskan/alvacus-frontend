// Types
type sodiumCorrectionFunctionTypes = {
  currentNa: number;
  desiredNa: number;
  rateOfNaCorrection: number;
  fluid: string;
  weight: number;
  weightUnit: string;
  gender: string;
  isFever: boolean;
  temperature: number;
  temperatureUnit: string;
  isWaterLoss: boolean;
  waterLossAmount: number;
  waterLossUnit: string;
  formula: string;
  ivfRateUnit: string;
};

const fluidSchema: { [key: string]: number } = {
  'five-nacl': 855,
  'three-nacl': 513,
  'zero-nine-nacl': 154,
  ringer: 130,
  'zero-fortyfive-nacl': 77,
  'zero-two-nacl': 34,
  'five-dextro-water': 0,
};

const bodyWaterLossSchema: { [key: string]: number } = {
  man: 0.6,
  woman: 0.5,
  el_man: 0.5,
  el_woman: 0.45,
  children: 0.6,
};

function convertToKilograms(weight: number, weightUnit: string): number {
  if (weightUnit === 'pounds') {
    return weight * 0.453592;
  }
  return weight;
}

function convertToCelsius(
  temperature: number,
  temperatureUnit: string
): number {
  if (temperatureUnit === 'fahrenheit') {
    return ((temperature - 32) * 5) / 9;
  }
  return temperature;
}

function convertToMilliliters(amount: number, unit: string): number {
  if (unit === 'l/day') {
    return amount * 1000;
  }
  return amount;
}

function adrogueFormula(
  fluidValue: number,
  currentNa: number,
  bodyWaterLoss: number,
  desiredNa: number,
  rateOfNaCorrection: number,
  extraFluid: number,
  ivfRateUnit: string
): string {
  const changeInSodium = (fluidValue - currentNa) / (bodyWaterLoss + 1);
  const ivfTime = (desiredNa - currentNa) / rateOfNaCorrection;
  const ivfRate = ((desiredNa - currentNa) * 1000) / (changeInSodium * ivfTime);
  const rate = Math.abs(ivfRate) + extraFluid / 24;
  switch (ivfRateUnit) {
    case 'ml/hour':
      return `${rate.toFixed(1)} ml/hour for ${ivfTime.toFixed(2)} hours`;
    case 'ml/min':
      return `${(rate / 60).toFixed(1)} ml/min for ${ivfTime.toFixed(2)} hours`;
    case 'ml/day':
      return `${(rate * 24).toFixed(1)} ml/day for ${ivfTime.toFixed(2)} hours`;
    case 'cc/hour':
      return `${rate.toFixed(1)} cc/hour for ${ivfTime.toFixed(2)} hours`;
    case 'cc/min':
      return `${(rate / 60).toFixed(1)} cc/min for ${ivfTime.toFixed(2)} hours`;
    case 'cc/day':
      return `${(rate * 24).toFixed(1)} cc/day for ${ivfTime.toFixed(2)} hours`;
    default:
      throw new Error(`Unsupported IVF rate unit: ${ivfRateUnit}`);
  }
}

function classicFormula(
  fluidValue: number,
  currentNa: number,
  bodyWaterLoss: number,
  desiredNa: number,
  rateOfNaCorrection: number,
  extraFluid: number,
  ivfRateUnit: string
): string {
  const ivfTime = Math.abs((desiredNa - currentNa) / rateOfNaCorrection);

  if (currentNa < 140) {
    const naDeficit = (desiredNa - currentNa) * bodyWaterLoss;
    const clVolume = naDeficit / fluidValue;
    const ivfRate = (clVolume * 1000) / ivfTime;
    const rate = Math.abs(ivfRate) + extraFluid / 24;
    switch (ivfRateUnit) {
      case 'ml/hour':
        return `${rate.toFixed(1)} ml/hour for ${ivfTime.toFixed(2)} hours`;
      case 'ml/min':
        return `${(rate / 60).toFixed(1)} ml/min for ${ivfTime.toFixed(
          2
        )} hours`;
      case 'ml/day':
        return `${(rate * 24).toFixed(1)} ml/day for ${ivfTime.toFixed(
          2
        )} hours`;
      case 'cc/hour':
        return `${rate.toFixed(1)} cc/hour for ${ivfTime.toFixed(2)} hours`;
      case 'cc/min':
        return `${(rate / 60).toFixed(1)} cc/min for ${ivfTime.toFixed(
          2
        )} hours`;
      case 'cc/day':
        return `${(rate * 24).toFixed(1)} cc/day for ${ivfTime.toFixed(
          2
        )} hours`;
      default:
        throw new Error(`Unsupported IVF rate unit: ${ivfRateUnit}`);
    }
  } else {
    const waterDeficit = (bodyWaterLoss * (currentNa - desiredNa)) / desiredNa;
    const ivfRate = (waterDeficit * 1000) / ivfTime;
    const rate = Math.abs(ivfRate) + extraFluid / 24;
    switch (ivfRateUnit) {
      case 'ml/hour':
        return `${rate.toFixed(1)} ml/hour for ${ivfTime.toFixed(2)} hours`;
      case 'ml/min':
        return `${(rate / 60).toFixed(1)} ml/min for ${ivfTime.toFixed(
          2
        )} hours`;
      case 'ml/day':
        return `${(rate * 24).toFixed(1)} ml/day for ${ivfTime.toFixed(
          2
        )} hours`;
      case 'cc/hour':
        return `${rate.toFixed(1)} cc/hour for ${ivfTime.toFixed(2)} hours`;
      case 'cc/min':
        return `${(rate / 60).toFixed(1)} cc/min for ${ivfTime.toFixed(
          2
        )} hours`;
      case 'cc/day':
        return `${(rate * 24).toFixed(1)} cc/day for ${ivfTime.toFixed(
          2
        )} hours`;
      default:
        throw new Error(`Unsupported IVF rate unit: ${ivfRateUnit}`);
    }
  }
}

export default function sodiumCorrectionFunction({
  currentNa,
  desiredNa,
  rateOfNaCorrection,
  fluid,
  weight,
  weightUnit,
  gender,
  isFever,
  temperature,
  temperatureUnit,
  isWaterLoss,
  waterLossAmount,
  waterLossUnit,
  formula,
  ivfRateUnit,
}: sodiumCorrectionFunctionTypes) {
  let extraFluid = 0;

  const fluidValue = fluidSchema[fluid];
  const weightValue = convertToKilograms(weight, weightUnit);
  const bodyWaterLoss = weightValue * bodyWaterLossSchema[gender];

  if (isFever) {
    const temperatureToCelsius = convertToCelsius(temperature, temperatureUnit);
    if (temperatureToCelsius >= 38) {
      if (isWaterLoss) {
        const waterLossToCC = convertToMilliliters(
          waterLossAmount,
          waterLossUnit
        );
        extraFluid += ((temperatureToCelsius - 38) / 100) * waterLossToCC;
      } else {
        extraFluid += (temperatureToCelsius - 37) * 100;
      }
    }
  }
  if (isWaterLoss) {
    const waterLossToCC = convertToMilliliters(waterLossAmount, waterLossUnit);
    extraFluid += waterLossToCC;
  }

  if (formula === 'adrogue') {
    return adrogueFormula(
      fluidValue,
      currentNa,
      bodyWaterLoss,
      desiredNa,
      rateOfNaCorrection,
      extraFluid,
      ivfRateUnit
    );
  } else if (formula === 'classic') {
    return classicFormula(
      fluidValue,
      currentNa,
      bodyWaterLoss,
      desiredNa,
      rateOfNaCorrection,
      extraFluid,
      ivfRateUnit
    );
  } else {
    return `Invalid formula: ${formula}`;
  }
}
