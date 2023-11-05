// Constants
import { BACKEND_URL } from '@/constants/AppConstants';

// Types
type getMonolithicCalculatorTypes = {
  calcSlug: string;
};

const getMonolithicCalculator = async ({
  calcSlug,
}: getMonolithicCalculatorTypes) => {
  const res = await fetch(
    `${BACKEND_URL}/api/calculators/monolithic/${calcSlug}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  if (!res.ok) {
    return undefined;
  }
  return res.json();
};

export default getMonolithicCalculator;
