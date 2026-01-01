'use client';

import { ResponsiveModal } from '@/app/dashboard/components/responsive-modal';

import { CreateWorkspaceForm } from './create-workspace-form';
import { useCreateWorkspaceModal } from '../hooks/use-create-workspace-modal';

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      {/* TODO: onSuccess should be open or close the modal */}
      <CreateWorkspaceForm onCancel={close} onSuccess={close} />
    </ResponsiveModal>
  );
};
