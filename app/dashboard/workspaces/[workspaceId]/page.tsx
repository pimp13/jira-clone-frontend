'use client';

import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';

const ShowWorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  return <div>workspace id: {workspaceId}</div>;
};

export default ShowWorkspacePage;
