import { WorkspaceSwitcherLoading } from '@/features/workspaces/components/loading';
import { Suspense } from 'react';
import { DashboardClient } from './components/dashboard-client';

const DashboardPage = () => {
  return (
    <Suspense>
      <DashboardClient />
    </Suspense>
  );
};
export default DashboardPage;
