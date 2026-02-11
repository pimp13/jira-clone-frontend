import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form';

interface WorkspaceSettingProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceSettingPage = async ({ params }: WorkspaceSettingProps) => {
  const { workspaceId } = await params;
  return (
    <div>
      <EditWorkspaceForm />
    </div>
  );
};

export default WorkspaceSettingPage;
