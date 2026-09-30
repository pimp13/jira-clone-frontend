export interface Permission {
  id: number;
  name: string;
  resource: string;
  action: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name?: string | null;
  roleId: number;
  role?: Role;
}

export interface RolePermission {
  roleId: number;
  permissionId: number;
}

export interface PermissionGroup {
  resource: string;
  permissions: Permission[];
}
