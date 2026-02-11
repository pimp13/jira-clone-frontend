interface WorkspaceSettingProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceSettingPage = async ({ params }: WorkspaceSettingProps) => {
  const { workspaceId } = await params;
  return (
    <div>
      WorkspaceSettingPage : {workspaceId}
      <p>Lorem ipsum dolor sit.</p>
    </div>
  );
};

export default WorkspaceSettingPage;
