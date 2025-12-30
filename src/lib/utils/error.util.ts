import { AxiosErrorResponse, ApiErrorResponse } from "@/types/error";

/**
 * Extracts error messages from various error formats
 */
export function extractErrorMessages(error: unknown): string[] {
  // Handle Axios errors
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosErrorResponse;
    const responseData = axiosError.response?.data;

    if (responseData) {
      // Handle array of messages
      if (Array.isArray(responseData.message)) {
        return responseData.message;
      }

      // Handle single message string
      if (typeof responseData.message === "string") {
        return [responseData.message];
      }

      // Handle errors object (validation errors)
      if (responseData.errors && typeof responseData.errors === "object") {
        const errorMessages: string[] = [];
        Object.entries(responseData.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            errorMessages.push(...messages);
          } else if (typeof messages === "string") {
            errorMessages.push(`${field}: ${messages}`);
          }
        });
        if (errorMessages.length > 0) {
          return errorMessages;
        }
      }

      // Handle error string
      if (typeof responseData.error === "string") {
        return [responseData.error];
      }
    }
  }

  // Handle Error instances
  if (error instanceof Error) {
    return [error.message];
  }

  // Handle string errors
  if (typeof error === "string") {
    return [error];
  }

  // Default fallback
  return ["An unexpected error occurred. Please try again later."];
}

/**
 * Gets the primary error message (first error)
 */
export function getPrimaryErrorMessage(error: unknown): string {
  const messages = extractErrorMessages(error);
  return messages[0] || "An unexpected error occurred. Please try again later.";
}

/**
 * Checks if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosErrorResponse;
    return !axiosError.response; // No response means network error
  }
  return false;
}

/**
 * Checks if error is a validation error (4xx)
 */
export function isValidationError(error: unknown): boolean {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosErrorResponse;
    const status = axiosError.response?.status;
    return status !== undefined && status >= 400 && status < 500;
  }
  return false;
}

/**
 * Checks if error is a server error (5xx)
 */
export function isServerError(error: unknown): boolean {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosErrorResponse;
    const status = axiosError.response?.status;
    return status !== undefined && status >= 500;
  }
  return false;
}

