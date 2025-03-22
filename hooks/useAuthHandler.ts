// hooks/useAuthHandler.ts
'use client';

import { useRouter } from 'next/navigation';

export function useAuthHandler() {
  const router = useRouter();

  const handleUnauthorized = () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    // Replace current history entry
    router.replace('/login');
  };

  return { handleUnauthorized };
}
