// hooks/use-update-role-permissions.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  assignPermissionToRole,
  removePermissionFromRole,
} from "../api/permission.api";

type UpdatePayload = {
  roleId: number;
  toAdd: number[];
  toRemove: number[];
};

export function useUpdateRolePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, toAdd, toRemove }: UpdatePayload) => {
      // موازی اجرا می‌کنیم
      await Promise.all([
        ...toAdd.map((permissionId) =>
          assignPermissionToRole(roleId, permissionId)
        ),
        ...toRemove.map((permissionId) =>
          removePermissionFromRole(roleId, permissionId)
        ),
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
}