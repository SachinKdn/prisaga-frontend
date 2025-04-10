'use client';
import handleError from '@hooks/handleError';
import { getToken } from './tokenHandler';

interface ValidationError {
  errors: {
    msg: string;
    param?: string;
    location?: string;
  }[];
}

interface ErrorResponse {
  data: ValidationError | any;
  message: string;
  status: number;
  success: boolean;
}
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
  if (!token) {
    localStorage.clear();
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
    console.log(response);
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      return undefined;
    }

    const result = (await response.json()) as IResponse<T> | ErrorResponse;
    if (!response.ok) {
      console.log('Error in response.ok->', result);
      if ('data' in result && result.data && 'errors' in result.data) {
        const errorData = result.data as ValidationError;
        if (errorData.errors && errorData.errors.length > 0) {
          const errorMsg = errorData.errors[0].msg;
          handleError(new Error(errorMsg || result.message));
          return undefined;
        }
      }

      // General error handling
      if (isNotifyError) {
        throw new Error(result.message);
      }
      throw new Error(
        result.message || `Error ${response.status}: ${response.statusText}`
      );
    }
    return (result as IResponse<T>).data;
  } catch (error) {
    if (isNotifyError) {
      handleError(
        error instanceof Error ? error : new Error('Unexpected error occurred')
      );
    }
    return undefined;
  }
}

export async function createUser(
  payload: UserInput
): Promise<User | undefined> {
  return request<User>('user/createUser', {
    method: 'POST',
    bodyData: payload,
  });
}

export async function updateUser(
  payload: UserInput,
  id: string
): Promise<User | undefined> {
  return request<User>(`user/update/${id}`, {
    method: 'PUT',
    bodyData: payload,
  });
}

export async function loginUser(
  payload: UserLogin
): Promise<LoginUserResponse | undefined> {
  return request<LoginUserResponse>('user/login', {
    method: 'POST',
    bodyData: payload,
  });
}

export async function createResume(
  payload: Resume
): Promise<LoginUserResponse | undefined> {
  return request<LoginUserResponse>('application/resume/create', {
    method: 'POST',
    bodyData: payload,
    isNotifyError: true,
  });
}

export async function getResumes(
  params?: string
): Promise<ITableResponse<UploadedResume[]> | undefined> {
  return request<ITableResponse<UploadedResume[]>>(
    `application/resumes?${params || ''}`,
    {
      method: 'GET',
    }
  );
}
