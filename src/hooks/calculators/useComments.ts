// Api & Core imports
import useSWRInfinite from 'swr/infinite';

// Hooks
import usePrivateAxios from '@/hooks/axios/usePrivateAxios';

// Types
import { GetCommentsTypes } from '@/types/comments.d';

// Fetcher function for SWR.
const fetcher = (url: string) =>
  usePrivateAxios.get(url).then((res) => res.data);

export default function useComments({ id, sortType }: GetCommentsTypes) {
  // Get key for pagination
  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex = pageIndex + 1; // SWR starts at 0, we start at 1
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return !id
      ? null
      : `/api/calculators/${id}/comments?page=${pageIndex}&type=${sortType}`; // SWR key
  };

  // Fetch comments from the server using infinite SWR.
  const { data, error, size, setSize, mutate, isLoading, isValidating } =
    useSWRInfinite(getKey, fetcher, {
      revalidateIfStale: true,
    });

  // Flatten data
  const comments = data?.flat();

  // Check if reached end of comments
  const isReachedEnd = data && data[data.length - 1]?.length < 3;

  // Check if loading more comments
  const loadingMore = data && typeof data[data.length - 1] === 'undefined';

  return {
    comments,
    isReachedEnd,
    loadingMore,
    error,
    size,
    setSize,
    mutate,
    isLoading,
    isValidating,
  };
}
