'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

// Server-side token management
export async function getServerToken() {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function clearAuthCookie() {
  const cookieStore = await cookies(); // Await the promise here
  cookieStore.delete('auth_token'); // Now you can call delete on cookieStore
}

// Generic request function
async function request<T>(url: string, config: RequestConfig = {}): Promise<T | undefined> {
  console.log('----< response');
  const { isNotifyError = false, bodyData, ...restConfig } = config;
  const token = await getServerToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    // await clearAuthCookie();
    // redirect('/login');
    return;
  }

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
      console.log(response, '----< response');
      // redirect('/login');
    }
    const result = (await response.json()) as ApiResponse<T>;
    console.log(result, '----< result');
    if (!response.ok) {
      console.log('========\n\n\n\n\n');
      throw new Error(result.message || 'Something went wrong!');
    }
    // Handle other error responses
    console.log(result);
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


export async function getCompanyList(): Promise<ITableResponse<Company[]> | undefined> {
  const result = await request<ITableResponse<Company[]>>('company/all');
  return result;
}

export async function getAgencyList(): Promise<ITableResponse<Agency[]> | undefined> {
  const result = await request<ITableResponse<Agency[]>>('agency/list');
  return result;
}

export async function getAgencyById(id: string): Promise<AgencyDetails | undefined> {
  console.log('\n\n\n\n\n\n\n id----->', id);
  const result = await request<AgencyDetails>(`agency/${id}`);
  return result;
}
// You can add more API endpoint functions here
