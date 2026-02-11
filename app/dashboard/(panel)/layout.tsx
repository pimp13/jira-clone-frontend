import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal';
import { Suspense } from 'react';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';

type DashboardLayoutProps = {
  children: Readonly<React.ReactNode>;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Suspense>
      <section className="min-h-screen">
        <CreateWorkspaceModal />
        <section className="flex w-full h-full">
          <section className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
            <Sidebar />
          </section>

          <section className="lg:pl-[264px] w-full">
            <section className="mx-auto max-w-screen-2xl h-full">
              <Navbar />

              <main className="h-full py-8 px-6 flex flex-col">{children}</main>
            </section>
          </section>
        </section>
      </section>
    </Suspense>
  );
};

export default DashboardLayout;
