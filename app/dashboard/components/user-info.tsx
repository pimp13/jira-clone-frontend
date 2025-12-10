'use client';

import { ApiResponseType } from '@/types/api';
import { useBackendApi } from '@/hooks/use-backend-api';

export const UserInfo = () => {
  const { data, isLoading } = useBackendApi<
    ApiResponse<ApiResponseType.UserInfo>
  >('/v1/auth/info', { method: 'get' });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Email: {data?.data.email}</p>
        </div>
      )}
    </div>
  );
};
