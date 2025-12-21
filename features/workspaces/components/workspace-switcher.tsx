'use client';

import { RiAddCircleFill } from 'react-icons/ri';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBackendApi } from '@/hooks/use-backend-api';
import { ApiResponseType } from '@/types/api';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { WorkspaceAvatar } from './workspace-avatar';

export const WorkspaceSwitcher = () => {
  const {
    data: workspaces,
    error,
    isLoading,
  } = useBackendApi<ApiResponse<ApiResponseType.Workspace[]>>('/v1/workspace');
  console.info('workspaces', workspaces);

  if (isLoading && workspaces?.ok) {
    return <section>Loading...</section>;
  }
  if (error) {
    console.error('Error in get workspaces:', error);
  }

  console.info(workspaces?.data);

  return (
    <section className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspace</p>

        <Tooltip>
          <TooltipTrigger asChild>
            <RiAddCircleFill className="size-5 text-neutral-400 cursor-pointer hover:opacity-75 transition" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Add Workspace</TooltipContent>
        </Tooltip>
      </div>

      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-3">
          <SelectValue
            placeholder={
              workspaces?.data && workspaces.data.length !== 0
                ? 'Show workspaces'
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
                    fullDistination={workspace?.fullDestination}
                  />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
    </section>
  );
};
