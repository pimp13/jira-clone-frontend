'use client';

import { useCurrentUser } from '@/hooks/use-current-user';

const DashboardPage = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.data) {
    return <div>User not found</div>;
  }

  return (
    <section className="bg-stone-50 p-5 rounded-md">
      <h1 className="text-lg">
        <span>Welcome to the dashboard</span>&nbsp;
        <span className="font-semibold">{user.data.name}</span>
      </h1>
    </section>
  );
};

export default DashboardPage;
