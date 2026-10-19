import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPermission } from "../api/permission.api";

export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
}