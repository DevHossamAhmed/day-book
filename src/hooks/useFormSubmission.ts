import { useState } from "react";
import toast from "react-hot-toast";
import { extractErrorMessages, getPrimaryErrorMessage } from "@/lib/utils/error.util";

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
      const errors = extractErrorMessages(error);
      setServerErrors(errors);
      onError?.(error);
      
      // Show toast for primary error message
      const primaryError = getPrimaryErrorMessage(error);
      toast.error(primaryError);
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
