import { useState, useEffect, useCallback, useRef } from "react";
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
  
  // Use refs to store the latest callbacks without causing re-renders
  const fetchFnRef = useRef(fetchFn);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const errorMessageRef = useRef(errorMessage);

  // Update refs when values change
  useEffect(() => {
    fetchFnRef.current = fetchFn;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    errorMessageRef.current = errorMessage;
  }, [fetchFn, onSuccess, onError, errorMessage]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFnRef.current();
      setData(result);
      onSuccessRef.current?.(result);
      return result;
    } catch (err) {
      setError(err);
      onErrorRef.current?.(err);
      toast.error(errorMessageRef.current);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array since we use refs

  useEffect(() => {
    if (enabled) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]); // Only depend on enabled, not refetch

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
