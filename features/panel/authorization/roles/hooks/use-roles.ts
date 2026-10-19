import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../backend-provider/roles-backend-provider";

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });
}