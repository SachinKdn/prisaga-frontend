'use client';

import handleError from '@hooks/handleError';
import { getToken } from './tokenHandler';

const useAuthenticatedFileUploadApi = () => {
  const uploadFile = async (payload: any) => {
    try {
      const { file } = payload;
      const formData = new FormData();
      formData.append('file', file);
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}application/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`File not uploaded!`);
      }
      const data: IResponse<UploadResponse> = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };
  const uploadProfilePicture = async (payload: any) => {
    try {
      const { file } = payload;
      const formData = new FormData();
      formData.append('file', file);
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}user/updateProfilePic`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Image not uploaded!`);
      }
      const data: IResponse<User> = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  const uploadAgencyLogo = async (payload: any, agencyId: string) => {
    try {
      const { file } = payload;
      const formData = new FormData();
      formData.append('file', file);
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}agency/uploadLogo/${agencyId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Logo not uploaded!`);
      }
      const data: IResponse<Agency> = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  return {
    uploadFile,
    uploadProfilePicture,
    uploadAgencyLogo,
  };
};

export { useAuthenticatedFileUploadApi };
