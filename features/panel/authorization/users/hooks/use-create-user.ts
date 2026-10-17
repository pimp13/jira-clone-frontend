import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserFormValues } from "../schemas";
import { createUser } from "../backend-provider/users-backend-provider";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bd: CreateUserFormValues) => createUser(bd),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  });
}