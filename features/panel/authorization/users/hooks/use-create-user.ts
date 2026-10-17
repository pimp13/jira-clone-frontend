import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserFormValues } from "../schemas";
import { createUser } from "../backend-provider/users-backend-provider";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bd: {
      name?: string | undefined;
      username: string;
      email: string;
      password: string;
      roleId: number;
      isActive: boolean;
    }) => createUser(bd),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  });
}