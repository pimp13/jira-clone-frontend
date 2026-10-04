export interface User {
  id: number;
  name: string | null;
  username: string;
  email: string;
  isActive: boolean;
  roleId: number;
  role: {
    id: number;
    name: string;
  };
  createdAt: string;
}

export function fetchUsersAll() {}
