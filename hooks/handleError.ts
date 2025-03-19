import toast from 'react-hot-toast';
interface FetchErrorResponse {
  message: string;
}

// Custom error handler for fetch API errors
const handleError = (error: unknown): { error: string } => {
  if (error instanceof Error) {
    // Network or general error (this happens when fetch fails)
    toast.error(error.message, {
      position: 'top-right',
      style: {
        fontSize: '15px',
      },
    });
    return { error: error.message };
  }

  // For non-axios errors or unknown errors
  const errorMessage = (error as Error).message || 'Unknown error occurred';
  // toast.error(errorMessage, options);
  return { error: errorMessage };
};

export default handleError;
