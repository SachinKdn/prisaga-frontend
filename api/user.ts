'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface RequestConfig extends RequestInit {
  isNotifyError?: boolean;
  bodyData?: unknown;
}

// Server-side token management
export async function getServerToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

// Generic request function
async function request<T>(
  url: string,
  config: RequestConfig = {}
): Promise<T | undefined> {
  const { isNotifyError = false, bodyData, ...restConfig } = config;
  const token = await getServerToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    // Uncomment if you want to redirect users without a token
    // await clearAuthCookie();
    // redirect('/login');
    return undefined;
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

    // Handle unauthorized access
    if (response.status === 401) {
      // Uncomment if you want to redirect on unauthorized
      // await clearAuthCookie();
      // redirect('/login');
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
  }
}

export async function getProfile(): Promise<IResponse<User | null>> {
  const token = await getServerToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    console.log('Return without call');
    return {
      data: null,
      success: false,
      message: 'Unauthorized',
    };
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${baseUrl}user/me`, { headers });

    if (response.status === 401) {
      return {
        data: null,
        success: false,
        message: 'Unauthorized',
      };
    }

    const result = (await response.json()) as IResponse<User | null>;

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      data: null,
      success: false,
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function getUsersList(): Promise<
  ITableResponse<User[]> | undefined
> {
  return request<ITableResponse<User[]>>('user/all');
}

export async function getAgencyList(): Promise<
  ITableResponse<Agency[]> | undefined
> {
  return request<ITableResponse<Agency[]>>('agency/list');
}

export async function getAgencyById(
  id: string
): Promise<AgencyDetails | undefined> {
  return request<AgencyDetails>(`agency/${id}`);
}
