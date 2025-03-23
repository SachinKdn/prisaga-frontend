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

  return {
    uploadFile,
  };
};

export { useAuthenticatedFileUploadApi };
