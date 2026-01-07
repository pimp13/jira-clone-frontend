import { WorkspaceSwitcherLoading } from '@/features/workspaces/components/loading';
import { Suspense } from 'react';
import { DashboardClient } from './components/dashboard-client';

const DashboardPage = () => {
  return (
    <Suspense fallback={<WorkspaceSwitcherLoading />}>
      <DashboardClient />
    </Suspense>
  );
};
export default DashboardPage;
