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
  isPublicRoute: boolean = false,
  config: RequestConfig = {}
): Promise<T | undefined> {
  const { isNotifyError = false, bodyData, ...restConfig } = config;
  const token = await getToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let redirectPath: string | null = null;

  if (!token && !isPublicRoute) {
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

// USER ACTIONS--------------------

export async function getProfile(): Promise<User | undefined> {
  return request<User>('user/me');
}

export async function verifyToken(token: string): Promise<User | undefined> {
  return request<User>(`user/verifyToken/${token}`, true, { method: 'POST' });
}

// USERS--------------------
export async function getUsersList(): Promise<
  ITableResponse<User[]> | undefined
> {
  return request<ITableResponse<User[]>>('user/all');
}

// JOBS--------------------
export async function getJobsList(): Promise<
  ITableResponse<IJob[]> | undefined
> {
  return request<ITableResponse<IJob[]>>('job');
}

export async function getJobByReferenceId(
  referenceId: string
): Promise<IJob | undefined> {
  return request<IJob>(`job/${referenceId}`);
}

// Vendors----------------------------
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
