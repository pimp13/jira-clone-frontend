import { useQuery } from "@tanstack/react-query";
import { getAllPermissions } from "../api/permission.api";

export function usePermissions() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: getAllPermissions,
  });
}