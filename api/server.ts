'use server';

import { redirect } from 'next/navigation';
import { clearToken, getToken } from './tokenHandler';
import { permanentRedirect } from 'next/navigation';

interface RequestConfig extends RequestInit {
  isNotifyError?: boolean;
  bodyData?: unknown;
}

async function request<T>(
  url: string,
  config: RequestConfig = {}
): Promise<T | undefined> {
  const { isNotifyError = false, bodyData, ...restConfig } = config;
  const token = await getToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let redirectPath: string | null = null;

  if (!token) {
    redirect('/login');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...restConfig.headers,
  };

  const requestConfig: RequestInit = {
    ...restConfig,
    headers,
  };

  if (bodyData) {
    requestConfig.body = JSON.stringify(bodyData);
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, requestConfig);

    if (response.status === 401) {
      await clearToken();
      redirectPath = `/login`;
      return undefined;
    }

    const result = (await response.json()) as IResponse<T>;
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }

    return result.data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (isNotifyError) {
      // Implement your error handling logic here
    }
    return undefined;
  } finally {
    if (redirectPath) permanentRedirect(redirectPath);
  }
}

export async function getProfile(): Promise<
  IResponse<User | null> | undefined
> {
  return request<IResponse<User | null>>('user/me');
}
