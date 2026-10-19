import { useQuery } from "@tanstack/react-query";
import { getRolePermissions } from "../api/permission.api";

export function useRolePermissions(roleId: number | null) {
  return useQuery({
    queryKey: ["role-permissions", roleId],
    queryFn: () => getRolePermissions(roleId!),
    enabled: !!roleId,
  });
}