'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBackendApi } from '@/hooks/use-backend-api';
import { ApiResponseType } from '@/types/api';

export const DashboardClient = () => {
  const router = useRouter();

  const { data, isLoading } =
    useBackendApi<ApiResponse<ApiResponseType.Workspace[]>>('/v1/workspace');

  if (!data || !data.data || data.data.length === 0) {
    router.push('/workspaces/create');
    // return null;
  }

  if (isLoading) return null;

  return (
    <section className="bg-stone-50 p-5 rounded-md">
      <h1 className="text-lg">Welcome to the dashboard</h1>
      <p>Your workspace count {data?.data?.length}</p>
      <Link href={`/dashboard/workspaces/${data?.data?.[0].id}`}>
        Show first workspace
      </Link>
    </section>
  );
};
