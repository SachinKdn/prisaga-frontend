import { getStorageItem } from '@utils/storageAction';

export const setToken = async (accessToken: string) => {
  await fetch(process.env.NEXT_PUBLIC_FE_URL + 'api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken }),
    credentials: 'include',
  });
};

export const clearToken = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_FE_URL + 'api/auth/login',
    {
      method: 'DELETE',
    }
  );
};

export const getToken = async (): Promise<string | null> => {
  if (typeof window !== 'undefined') {
    return getStorageItem('token');
  } else {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('access_token')?.value || null;
  }
};
