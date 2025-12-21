import { useState } from "react";
import toast from "react-hot-toast";

type UseFormSubmissionOptions<T> = {
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
};

export function useFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = "Operation completed successfully!",
  errorMessage = "An unexpected error occurred. Please try again later.",
}: UseFormSubmissionOptions<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const handleSubmit = async (data: T) => {
    setServerErrors([]);
    setIsLoading(true);

    try {
      await onSubmit(data);
      toast.success(successMessage);
      onSuccess?.();
    } catch (error) {
      const errors = extractErrors(error);
      setServerErrors(errors);
      onError?.(error);
      
      if (errors.length === 0) {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    serverErrors,
    setServerErrors,
  };
}

function extractErrors(error: unknown): string[] {
  if (
    error instanceof Error &&
    "response" in error &&
    (error as any).response?.data?.errors
  ) {
    return (error as any).response.data.errors;
  }

  if (
    error instanceof Error &&
    "response" in error &&
    (error as any).response?.data?.message
  ) {
    const message = (error as any).response.data.message;
    return Array.isArray(message) ? message : [message];
  }

  return [];
}
