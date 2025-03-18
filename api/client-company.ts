'use client';
import { RootState } from '@/store';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

// Types
type ApiResponse<T = any> = {
  data: T;
  message: string;
  status: number;
};

interface RequestConfig extends RequestInit {
  isNotifyError?: boolean;
  bodyData?: unknown;
}

// Generic request function
async function request<T>(url: string, config: RequestConfig = {}): Promise<T | undefined> {
  const { isNotifyError = false, bodyData, ...restConfig } = config;

  const token = localStorage.getItem('token');
  if (!token) redirect('/login');
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const headers = {
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
      // await clearAuthCookie();
      console.log('401 errririiririiiririir');
      //   redirect('/login');
    }
    const result = (await response.json()) as ApiResponse<T>;
    console.log(result, '----< result');
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }
    // Handle other error responses
    console.log(result);
    console.log('========\n\n\n\n\n');
    return result.data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (isNotifyError) {
      // You can implement your error handling logic here
      // handleError(error);
    }
    return undefined;
  }
}

export async function createUser(payload: UserInput): Promise<User | undefined> {
  return request<User>('user/createUser', {
    method: 'POST',
    bodyData: payload, // Pass the payload as the bodyData
  });
}

export async function updateUser(payload: UserInput, id: string): Promise<User | undefined> {
  return request<User>(`user/update/${id}`, {
    method: 'PUT',
    bodyData: payload, // Pass the payload as the bodyData
  });
}
