/**
 * API Error Response Types
 */
export interface ApiErrorResponse {
  message?: string | string[];
  errors?: Record<string, string[]>;
  error?: string;
  status?: number;
}

/**
 * Axios Error with typed response
 */
export interface AxiosErrorResponse {
  response?: {
    data?: ApiErrorResponse;
    status?: number;
    statusText?: string;
  };
  message?: string;
  request?: unknown;
}

