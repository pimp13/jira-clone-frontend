'use client';

import { useRouter } from 'next/navigation';

import { WorkspaceSwitcherLoading } from '@/features/workspaces/components/loading';
import { useBackendApi } from '@/hooks/use-backend-api';
import { ApiResponseType } from '@/types/api';
import Link from 'next/link';

const DashboardPage = () => {
  const router = useRouter();
  const {
    data: workspaces,
    error,
    isLoading,
  } = useBackendApi<ApiResponse<ApiResponseType.Workspace[]>>('/v1/workspace');

  if (isLoading) {
    return <WorkspaceSwitcherLoading />;
  }

  if (workspaces?.data?.length === 0) {
    return router.push('/workspace/create');
  }

  return (
    <section className="bg-stone-50 p-5 rounded-md">
      <h1 className="text-lg">Welcome to the dashboard</h1>
      <p>Your workspace count {workspaces?.data?.length}</p>
      <p>
        <Link href={`/dashboard/workspaces/${workspaces?.data?.[0].id}`}>
          Show first workspace
        </Link>
      </p>
    </section>
  );
};

export default DashboardPage;
