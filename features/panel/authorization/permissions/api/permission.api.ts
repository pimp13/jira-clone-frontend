import type { Permission, Role, User } from "../types/permission.types";

const API_URL = 'http://localhost:3000/api/v1';

export async function getAllPermissions(): Promise<Permission[]> {
  const response = await fetch(`${API_URL}/permissions`);

  if (!response.ok) {
    throw new Error("Failed to fetch permissions");
  }

  const result = await response.json();

  return result.data;
}

export async function createNewPermission(data: any) {
  const response = await fetch(`${API_URL}/permissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch permissions');
  }

  const result = await response.json();

  return result.data;
}


export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  return result.data;
}

export async function getAllRoles() {
  const response = await fetch(`${API_URL}/roles`);

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  const result = await response.json();
  return result.data;
}

export async function getRoleById(roleId: number) {
  const response = await fetch(`${API_URL}/roles/${roleId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch role");
  }

  const result = await response.json();
  return result.data;
}

export async function getRolePermissions(roleId: number) {
  const response = await fetch(`${API_URL}/roles/${roleId}/permissions`);

  if (!response.ok) {
    throw new Error("Failed to fetch role permissions");
  }

  const result = await response.json();
  return result.data;
}



export async function assignPermissionToRole(
  roleId: number,
  permissionId: number
) {
  const response = await fetch(
    `${API_URL}/roles/${roleId}/permissions/${permissionId}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to assign permission to role");
  }

  const result = await response.json();
  return result.data;
}

export async function removePermissionFromRole(
  roleId: number,
  permissionId: number
) {
  const response = await fetch(
    `${API_URL}/roles/${roleId}/permissions/${permissionId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove permission from role");
  }

  const result = await response.json();
  return result.data;
}