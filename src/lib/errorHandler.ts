export class AppError extends Error {
  public code: 'NETWORK' | 'VALIDATION' | 'AUTH' | 'NOT_FOUND' | 'SERVER';
  public retryable: boolean;

  constructor(
    message: string,
    code: 'NETWORK' | 'VALIDATION' | 'AUTH' | 'NOT_FOUND' | 'SERVER' = 'SERVER',
    retryable = false
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.retryable = retryable;
  }
}

export const isAppError = (value: unknown): value is AppError => value instanceof AppError;

export const getUserErrorMessage = (error: unknown): string => {
  if (isAppError(error)) {
    switch (error.code) {
      case 'NETWORK':
        return 'Network error. Please check your connection and try again.';
      case 'VALIDATION':
        return 'There is a problem with the submitted data. Please review your input.';
      case 'AUTH':
        return 'Authentication error. Please sign in and try again.';
      case 'NOT_FOUND':
        return 'The requested item was not found.';
      case 'SERVER':
      default:
        return 'Something went wrong. Please try again later.';
    }
  }

  return 'An unexpected error occurred. Please try again.';
};

export const logError = (error: unknown, context?: string) => {
  if (context) {
    console.error(`[${context}]`, error);
  } else {
    console.error(error);
  }
};
