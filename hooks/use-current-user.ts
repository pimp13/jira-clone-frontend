import { ApiResponseType } from '@/types/api';
import { useBackendApi } from './use-backend-api';

export const useCurrentUser = () => {
  const { data: user, isLoading } = useBackendApi<
    ApiResponse<ApiResponseType.UserInfo>
  >('/v1/auth/info', { method: 'get' });

  return { user, isLoading };
};
