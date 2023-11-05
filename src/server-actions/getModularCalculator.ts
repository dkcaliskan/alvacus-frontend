// Constants
import { BACKEND_URL } from '@/constants/AppConstants';

// Types
type getModularCalculatorTypes = {
  calcId: string;
};

const getModularCalculator = async ({ calcId }: getModularCalculatorTypes) => {
  const res = await fetch(`${BACKEND_URL}/api/calculators/${calcId}`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    return undefined;
  }
  return res.json();
};

export default getModularCalculator;
