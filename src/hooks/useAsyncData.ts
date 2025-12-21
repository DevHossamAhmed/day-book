import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

type UseAsyncDataOptions<T> = {
  fetchFn: () => Promise<T>;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  errorMessage?: string;
};

export function useAsyncData<T>({
  fetchFn,
  enabled = true,
  onSuccess,
  onError,
  errorMessage = "Failed to fetch data. Please try again later.",
}: UseAsyncDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, onSuccess, onError, errorMessage]);

  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled, refetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
