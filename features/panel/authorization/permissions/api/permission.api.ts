import type { Permission, Role, User } from "../types/permission.types";

export async function getAllPermissions(): Promise<Permission[]> {
  const response = await fetch("/api/permissions");

  if (!response.ok) {
    throw new Error("Failed to fetch permissions");
  }

  const result = await response.json();

  return result.data;
}

export async function getAllRoles(): Promise<Role[]> {
  const response = await fetch("/api/roles");

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  const result = await response.json();

  return result.data;
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  return result.data;
}

export async function getRolePermissions(roleId: number) {
  const response = await fetch(`/api/roles/${roleId}/permissions`);

  if (!response.ok) {
    throw new Error("Failed to fetch role permissions");
  }

  const result = await response.json();

  return result.data;
}

export async function updateRolePermissions({
  roleId,
  permissionIds,
}: {
  roleId: number;
  permissionIds: number[];
}) {
  const response = await fetch(`/api/roles/${roleId}/permissions`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ permissionIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to update role permissions");
  }

  const result = await response.json();

  return result.data;
}
