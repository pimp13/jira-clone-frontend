'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useBackendApi } from '@/hooks/use-backend-api';
import { ApiResponseType } from '@/types/api';
import { RiAddCircleFill } from 'react-icons/ri';
import { WorkspaceAvatar } from './workspace-avatar';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { WorkspaceSwitcherLoading } from './loading';
import { useCreateWorkspaceModal } from '../hooks/use-create-workspace-modal';

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspaceModal();

  const {
    data: workspaces,
    error,
    isLoading,
  } = useBackendApi<ApiResponse<ApiResponseType.Workspace[]>>('/v1/workspace');

  if (error) {
    console.error('Error in get workspaces:', error);
  }

  const onSelect = (id: string) => {
    router.push(`/dashboard/workspace/${id}`);
  };

  return (
    <section className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspace</p>

        <Tooltip>
          <TooltipTrigger asChild>
            <RiAddCircleFill
              onClick={open}
              className="size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition"
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">Add Workspace</TooltipContent>
        </Tooltip>
      </div>

      {isLoading ? (
        <WorkspaceSwitcherLoading />
      ) : (
        <Select onValueChange={onSelect} value={workspaceId}>
          <SelectTrigger className="w-full bg-neutral-200 font-medium p-3">
            <SelectValue
              placeholder={
                workspaces?.data && workspaces.data.length !== 0
                  ? `Your workspace count ${workspaces.data.length}`
                  : 'No workspace'
              }
            />
          </SelectTrigger>

          {workspaces?.data && (
            <SelectContent>
              {workspaces?.data.map((workspace: ApiResponseType.Workspace) => (
                <SelectItem value={workspace?.id} key={workspace?.id}>
                  <div className="flex justify-start items-center gap-3 font-medium">
                    <WorkspaceAvatar
                      name={workspace?.name}
                      imageUrl={workspace?.imageUrl}
                    />
                    <span className="truncate">
                      {workspace.name}
                      {/* {workspace.name.slice(0, 23)} */}
                      {/* {workspace.name.length > 23 ? '...' : ''} */}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      )}
    </section>
  );
};
