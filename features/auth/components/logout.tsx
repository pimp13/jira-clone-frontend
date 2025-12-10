'use client';

import { Button } from '@/components/ui/button';
import { axios } from '@/lib/axios';
import { toast } from 'react-hot-toast';

export const Logout = () => {
  const handleLogout = async () => {
    try {
      const resp = await axios.post<ApiResponse<null>>('/v1/auth/logout');
      if (resp.status === 200 && resp.data.ok) {
        toast.success(resp.data.message ?? 'you logout is ok');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};
