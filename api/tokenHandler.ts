import { getStorageItem } from '@utils/storageAction';
import { permanentRedirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export const setToken = async (accessToken: string) => {
  const r = await fetch(process.env.NEXT_PUBLIC_FE_URL + 'api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken }),
    credentials: 'include',
  });
  console.log('r--', r);
};

export const clearToken = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_FE_URL + 'api/auth/login',
    {
      method: 'DELETE', // Use the DELETE method to clear the cookie
    }
  );

  const data = await response.json();
  console.log(data.message);
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
