import { useQuery } from "@tanstack/react-query";
import { fetchUsersAll } from "../backend-provider/users-backend-provider";

export function useUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersAll,
  });
}