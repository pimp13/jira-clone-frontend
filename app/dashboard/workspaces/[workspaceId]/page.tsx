'use client';

// import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { Suspense } from 'react';

const ShowWorkspacePage = () => {
  // const workspaceId = useWorkspaceId();

  return (
    <Suspense fallback={'helloo'}>
      <div>workspace id: null felan</div>
    </Suspense>
  );
};

export default ShowWorkspacePage;
