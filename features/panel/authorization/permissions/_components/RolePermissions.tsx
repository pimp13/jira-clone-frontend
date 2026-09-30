"use client";

import { useMemo, useState } from "react";
import { Save, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  {
    id: 1,
    name: "Administrator",
  },
  {
    id: 2,
    name: "Editor",
  },
  {
    id: 3,
    name: "Author",
  },
];

const permissions = [
  {
    id: 1,
    resource: "Users",
    action: "Create",
    name: "users.create",
  },
  {
    id: 2,
    resource: "Users",
    action: "Read",
    name: "users.read",
  },
  {
    id: 3,
    resource: "Users",
    action: "Update",
    name: "users.update",
  },
  {
    id: 4,
    resource: "Users",
    action: "Delete",
    name: "users.delete",
  },

  {
    id: 5,
    resource: "Posts",
    action: "Create",
    name: "posts.create",
  },
  {
    id: 6,
    resource: "Posts",
    action: "Read",
    name: "posts.read",
  },
  {
    id: 7,
    resource: "Posts",
    action: "Update",
    name: "posts.update",
  },
  {
    id: 8,
    resource: "Posts",
    action: "Delete",
    name: "posts.delete",
  },

  {
    id: 9,
    resource: "Roles",
    action: "Create",
    name: "roles.create",
  },
  {
    id: 10,
    resource: "Roles",
    action: "Read",
    name: "roles.read",
  },
  {
    id: 11,
    resource: "Roles",
    action: "Update",
    name: "roles.update",
  },
  {
    id: 12,
    resource: "Roles",
    action: "Delete",
    name: "roles.delete",
  },
];

const initialPermissions = {
  1: new Set([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]),
  2: new Set([
    2,
    3,
    6,
    7,
    10,
    11,
  ]),
  3: new Set([
    2,
    6,
  ]),
};

export function RolePermissions() {
  const [selectedRole, setSelectedRole] = useState("1");

  const [selectedPermissions, setSelectedPermissions] =
    useState<Record<number, Set<number>>>(initialPermissions);

  const rolePermissions =
    selectedPermissions[Number(selectedRole)] ?? new Set();

  const groupedPermissions = useMemo(() => {
    return permissions.reduce<
      Record<string, typeof permissions>
    >((groups, permission) => {
      if (!groups[permission.resource]) {
        groups[permission.resource] = [];
      }

      groups[permission.resource].push(permission);

      return groups;
    }, {});
  }, []);

  const togglePermission = (permissionId: number) => {
    setSelectedPermissions((current) => {
      const roleId = Number(selectedRole);

      const currentSet = new Set(
        current[roleId] ?? []
      );

      if (currentSet.has(permissionId)) {
        currentSet.delete(permissionId);
      } else {
        currentSet.add(permissionId);
      }

      return {
        ...current,
        [roleId]: currentSet,
      };
    });
  };

  const toggleResource = (resource: string) => {
    const resourcePermissions =
      groupedPermissions[resource];

    const allSelected = resourcePermissions.every(
      (permission) =>
        rolePermissions.has(permission.id)
    );

    setSelectedPermissions((current) => {
      const roleId = Number(selectedRole);

      const next = new Set(
        current[roleId] ?? []
      );

      resourcePermissions.forEach((permission) => {
        if (allSelected) {
          next.delete(permission.id);
        } else {
          next.add(permission.id);
        }
      });

      return {
        ...current,
        [roleId]: next,
      };
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5" />

              <CardTitle>
                Role Permissions
              </CardTitle>
            </div>

            <CardDescription className="mt-1">
              Select which permissions this role is
              allowed to use.
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={selectedRole}
              onValueChange={setSelectedRole}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {roles.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={String(role.id)}
                  >
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button>
              <Save className="mr-2 size-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-5 flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
          <div>
            <p className="text-sm font-medium">
              {roles.find(
                (role) =>
                  String(role.id) === selectedRole
              )?.name}
            </p>

            <p className="text-xs text-muted-foreground">
              Permissions assigned to this role
            </p>
          </div>

          <Badge variant="secondary">
            {rolePermissions.size} permissions
          </Badge>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedPermissions).map(
            ([resource, resourcePermissions]) => {
              const allSelected =
                resourcePermissions.every(
                  (permission) =>
                    rolePermissions.has(
                      permission.id
                    )
                );

              const someSelected =
                resourcePermissions.some(
                  (permission) =>
                    rolePermissions.has(
                      permission.id
                    )
                );

              return (
                <div
                  key={resource}
                  className="rounded-lg border"
                >
                  <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                    <div>
                      <p className="font-medium">
                        {resource}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Manage {resource.toLowerCase()} access
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {resourcePermissions.filter(
                          (permission) =>
                            rolePermissions.has(
                              permission.id
                            )
                        ).length}
                        /
                        {resourcePermissions.length}
                      </span>

                      <Checkbox
                        checked={
                          allSelected
                            ? true
                            : someSelected
                              ? "indeterminate"
                              : false
                        }
                        onCheckedChange={() =>
                          toggleResource(resource)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-1 p-2 sm:grid-cols-2 lg:grid-cols-4">
                    {resourcePermissions.map(
                      (permission) => (
                        <label
                          key={permission.id}
                          className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 hover:bg-muted/50"
                        >
                          <Checkbox
                            checked={rolePermissions.has(
                              permission.id
                            )}
                            onCheckedChange={() =>
                              togglePermission(
                                permission.id
                              )
                            }
                          />

                          <div>
                            <p className="text-sm font-medium">
                              {permission.action}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {permission.name}
                            </p>
                          </div>
                        </label>
                      )
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
}