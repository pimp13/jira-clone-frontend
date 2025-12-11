import { axios } from '@/lib/axios';

export const useLogout = async () => {
  try {
    const resp = await axios.post<ApiResponse<null>>('/v1/auth/logout');
    if (resp.status === 200 && resp.data.ok) {
      return resp.data.message;
    } else {
      throw new Error(resp.data.message ?? 'Server Error...');
    }
  } catch (err: any) {
    const errMsg =
      (err.response?.data as ErrorResponse)?.message ?? 'Server Error!!';
    throw new Error(errMsg);
  }
};
