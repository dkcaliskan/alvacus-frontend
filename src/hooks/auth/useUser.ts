// Api & Core imports
import useSWR from 'swr';

// Hooks
import { useAuth } from '@/hooks/auth/useAuth';

// Types
import { UserTypes } from '@/types/user.d';

export default function useUser() {
  const auth = useAuth();

  // Refresh the user data when the user is still logged in
  const { data, mutate, error, isLoading, isValidating } = useSWR(
    `/api/auth/refresh`,
    auth.isLoggedIn,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.response.status === 404) return;

        // Only retry up to 5 times.
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
    user: data as UserTypes,
    mutate,
  };
}
