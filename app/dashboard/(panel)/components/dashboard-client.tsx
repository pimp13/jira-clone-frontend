'use client';

import { WorkspaceSwitcherLoading } from '@/features/workspaces/components/loading';
import { useBackendApi } from '@/hooks/use-backend-api';
import { ApiResponseType } from '@/types/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const DashboardClient = () => {
  const router = useRouter();

  const { data, isLoading } =
    useBackendApi<ApiResponse<ApiResponseType.Workspace[]>>('/v1/workspace');
  if (isLoading) return <WorkspaceSwitcherLoading />;

  if (!data || !data.data || data.data.length === 0) {
    router.push('/workspaces/create');
    // return null;
  }

  return (
    <section className="bg-stone-50 p-5 rounded-md">
      <h1 className="text-lg">Welcome to the dashboard</h1>
      <p>Your workspace count {data?.data?.length}</p>
      <Link href={`/dashboard/workspace/${data?.data?.[0].id}`}>
        Show first workspace
      </Link>
    </section>
  );
};
