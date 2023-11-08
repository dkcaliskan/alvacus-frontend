// Hooks
import axios from 'axios';

// Constants
import { BACKEND_URL, BASE_URL } from '@/constants/AppConstants';

// Types
import type { CalculatorTypes } from '@/types/calculators.d';

export default async function sitemap() {
  // Get all calculators from the API
  const res = await axios.get(`${BACKEND_URL}/api/calculators`);

  const calculators: CalculatorTypes[] = await res.data.calculators;

  const calculatorPaths =
    calculators.map((calculator) => {
      return {
        url: `${BASE_URL}/${calculator.type}/${
          calculator.type === 'modular' ? calculator._id : calculator.slug
        }`,
        lastModified: calculator.updatedAt,
        changeFrequency: 'daily',
        priority: 0.5,
      };
    }) ?? [];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/legal/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },

    ...calculatorPaths,
  ];
}
