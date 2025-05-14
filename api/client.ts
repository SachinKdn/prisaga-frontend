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
  config: RequestConfig = {},
  isPublicRoute: boolean = false
): Promise<T | undefined> {
  const { isNotifyError = false, bodyData, ...restConfig } = config;
  const token = await getToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!token && !isPublicRoute) {
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
      console.log('=========isNotifyError======', isNotifyError);
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
    isNotifyError: true,
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

export async function deleteUser(id: string): Promise<User | undefined> {
  return request<User>(`user/${id}`, {
    method: 'DELETE',
  });
}

export async function loginUser(
  payload: UserLogin
): Promise<LoginUserResponse | undefined> {
  return request<LoginUserResponse>(
    'user/login',
    {
      isNotifyError: true,
      method: 'POST',
      bodyData: payload,
    },
    true
  );
}

export async function registerAgency(
  payload: AgencySignup
): Promise<LoginUserResponse | undefined> {
  return request<LoginUserResponse>(
    'user/agency-register',
    {
      isNotifyError: true,
      method: 'POST',
      bodyData: payload,
    },
    true
  );
}

export async function createAgency(
  userId: string,
  payload: IAgencyDetails
): Promise<Agency | undefined> {
  return request<Agency>(
    `agency/create/${userId}`,
    {
      isNotifyError: true,
      method: 'POST',
      bodyData: payload,
    },
    true
  );
}

export async function updateAgency(
  id: string,
  payload: IAgencyDetails
): Promise<IAgencyDetails | undefined> {
  return request<IAgencyDetails>(`agency/${id}`, {
    method: 'PUT',
    bodyData: payload,
  });
}

export async function createPassword(
  token: string,
  payload: INewPassword
): Promise<User | undefined> {
  return request<User>(
    `user/resetPassword/${token}`,
    {
      isNotifyError: true,
      method: 'POST',
      bodyData: payload,
    },
    true
  );
}

// resume-----------------

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

export async function getUsersList(): Promise<
  ITableResponse<User[]> | undefined
> {
  return request<ITableResponse<User[]>>('user/all');
}

// company-----------------

export async function getCompanies(): Promise<
  ITableResponse<Company[]> | undefined
> {
  return request<ITableResponse<Company[]> | undefined>('company/all');
}

export async function createCompany(
  payload: Company
): Promise<Company | undefined> {
  return request<Company | undefined>('company/create', {
    method: 'POST',
    bodyData: payload,
    isNotifyError: true,
  });
}

// job-----------------
export async function createJob(
  payload: Partial<IJob>
): Promise<IJob | undefined> {
  return request<IJob | undefined>('job/create', {
    method: 'POST',
    bodyData: payload,
    isNotifyError: true,
  });
}

export async function updateJob(
  payload: Partial<IJob>,
  id: string
): Promise<IJob | undefined> {
  return request<IJob | undefined>(`job/update/${id}`, {
    method: 'PUT',
    bodyData: payload,
    isNotifyError: true,
  });
}

export async function getJobsList(
  params?: string
): Promise<ITableResponse<IJob[]> | undefined> {
  return request<ITableResponse<IJob[]>>(`job?${params || ''}`);
}

export async function getAllocatedJobs(
  params?: string
): Promise<ITableResponse<IJob[]> | undefined> {
  return request<ITableResponse<IJob[]> | undefined>(
    `job/allocatedJobs?${params || ''}`,
    {
      method: 'GET',
    }
  );
}

export async function getEngagedJobs(
  params?: string
): Promise<ITableResponse<IJob[]> | undefined> {
  return request<ITableResponse<IJob[]> | undefined>(
    `job/engagedJobs?${params || ''}`,
    {
      method: 'GET',
    }
  );
}

export async function getDeallocatedJobs(
  params?: string
): Promise<ITableResponse<IJob[]> | undefined> {
  return request<ITableResponse<IJob[]> | undefined>(
    `job/deallocatedJobs?${params || ''}`,
    {
      method: 'GET',
    }
  );
}

export async function toggleJobCategory(
  jobId: string,
  category: string
): Promise<Agency | undefined> {
  return request<Agency | undefined>(`agency/toggleJob`, {
    method: 'POST',
    bodyData: { jobId, category },
    isNotifyError: true,
  });
}

// Application/ Candidate -------------------------

export async function checkCandidate(
  payload: IAddCandidate
): Promise<CheckCandidateResumeResponse | undefined> {
  return request<CheckCandidateResumeResponse | undefined>(
    'application/checkCandidate',
    {
      method: 'POST',
      bodyData: payload,
      isNotifyError: true,
    }
  );
}

export async function applyForJob(
  payload: Partial<IApplicationForm>
): Promise<IApplicationForm | undefined> {
  return request<IApplicationForm>('application/create', {
    method: 'POST',
    bodyData: payload,
    isNotifyError: true,
  });
}

// Vendor - Agency --------------------------------
export async function getVendorsList(
  params?: string
): Promise<ITableResponse<Agency[]> | undefined> {
  return request<ITableResponse<Agency[]>>(`agency/list?${params || ''}`, {
    method: 'GET',
  });
}

export async function updateAgencySubscription(
  payload: SubscriptionFormData,
  id: string
): Promise<Agency | undefined> {
  return request<Agency | undefined>(`agency/subcription/${id}`, {
    method: 'PUT',
    bodyData: payload,
    isNotifyError: true,
  });
}

export async function sendUpgradeRequest(
  payload: SubscriptionFormData
): Promise<string | undefined> {
  return request<string | undefined>(`agency/subscriptionRequest`, {
    method: 'POST',
    bodyData: payload,
    isNotifyError: true,
  });
}
