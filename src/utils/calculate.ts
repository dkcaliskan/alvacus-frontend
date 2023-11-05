import { evaluate } from 'mathjs';

type EvaluateFormulaTypes = {
  formula: string;
  fixedLength?: number;
};

export function evaluateFormula({
  formula,
  fixedLength = 12,
}: EvaluateFormulaTypes): number {
  const result = evaluate(formula);

  return Number.isNaN(result) ? 0 : Number(result.toFixed(fixedLength));
}
