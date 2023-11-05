// Api & Core imports
import useSWR from 'swr';

// Hooks
import useAxios from '../axios/useAxios';

// Fetcher function for SWR.
const fetcher = (url: string) => useAxios.get(url).then((res) => res.data);

export default function useModularCalc(calcId: string) {
  // Fetch calculator from the server using SWR.
  const { data, mutate, error, isLoading, isValidating } = useSWR(
    `/api/calculators/${calcId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    isLoading,
    isValidating,
    error,
    calculatorData: data,
    mutate,
  };
}
