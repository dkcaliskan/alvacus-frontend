// Api & Core imports
import useSWR from 'swr';

// Hooks
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import { SearchCalcTypes } from '@/types/calculators.d';

// Fetcher function for SWR.
const fetcher = (url: string) =>
  usePrivateAxios.get(url).then((res) => res.data);

export default function useUnseenReports({
  page = 1,
  sortType = 'recent',
  search = '',
  limit = 3,
}: SearchCalcTypes) {
  // Fetch all users from the server using SWR.
  const { data, mutate, error, isLoading, isValidating } = useSWR(
    `/api/report/unseen?page=${page}&type=${sortType}&search=${search}&limit=${limit}`,
    fetcher,
    {
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
    reportsData: data,
    mutate,
  };
}
