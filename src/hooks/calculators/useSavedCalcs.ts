// Api & Core imports
import useSWR from 'swr';

// Hooks
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import { SearchCalcTypes } from '@/types/calculators.d';

// Fetcher function for SWR.
const fetcher = (url: string) =>
  usePrivateAxios.get(url).then((res) => res.data);

export default function useSavedCalcs({
  page = 1,
  sortType = 'recent',
  search = '',
  tag = 'all',
  userId,
}: SearchCalcTypes) {
  // Fetch user saved calculators from the server using SWR.
  const { data, mutate, error, isLoading, isValidating } = useSWR(
    !userId
      ? null
      : `/api/calculators/${userId}/saved?page=${page}&type=${sortType}&search=${search}&tag=${
          tag === 'all' ? '' : tag
        }`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.response.status === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 5) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  return {
    isLoading,
    isValidating,
    error,
    calculatorsData: data,
    mutate,
  };
}
