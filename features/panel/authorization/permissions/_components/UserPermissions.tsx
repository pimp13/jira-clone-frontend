"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUsers } from "../hooks/use-users";
import { useRolePermissions } from "../hooks/use-role-permissions";

export function UserPermissions() {
  const { data: users, isPending: usersLoading } = useUsers();

  const [selectedUserId, setSelectedUserId] = useState<string>("");

  // وقتی یوزرها لود شدن، اولین یوزر رو انتخاب کن
  useEffect(() => {
    if (users && users.length > 0 && !selectedUserId) {
      setSelectedUserId(String(users[0].id));
    }
  }, [users, selectedUserId]);

  const selectedUser = users?.find(
    (user: any) => String(user.id) === selectedUserId
  );

  // فرض: user.roleId یا user.role?.id
  const roleId = selectedUser?.roleId ?? selectedUser?.role?.id ?? null;

  const {
    data: permissions,
    isPending: permissionsLoading,
  } = useRolePermissions(roleId);

  // permissions می‌تونه آرایه‌ای از object باشه یا string
  // اینجا فرض می‌کنیم شکلش اینه:
  // [{ id, name, resource, action }] یا [{ permission: { name, resource, action } }]
  const normalizedPermissions: any[] = useMemo(() => {
    if (!permissions) return [];

    return permissions.map((item: any) => {
      // اگر مستقیم permission باشه
      if (item.name && item.resource) return item;
      // اگر داخل relation باشه
      return item.permission ?? item;
    });
  }, [permissions]);

  const groupedPermissions = useMemo(() => {
    return normalizedPermissions.reduce<
      Record<string, { action: string; name: string }[]>
    >((groups, permission) => {
      const resource = permission.resource ?? permission.name?.split(".")[0];
      const action = permission.action ?? permission.name?.split(".")[1];

      if (!resource || !action) return groups;

      if (!groups[resource]) {
        groups[resource] = [];
      }

      groups[resource].push({
        action,
        name: permission.name,
      });

      return groups;
    }, {});
  }, [normalizedPermissions]);

  if (usersLoading) {
    return <p className="p-6 text-muted-foreground">Loading users...</p>;
  }

  if (!users?.length) {
    return <p className="p-6 text-muted-foreground">No users found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserRound className="size-5" />
          <CardTitle>User Access</CardTitle>
        </div>

        <p className="text-sm text-muted-foreground">
          View the effective permissions inherited by a user through their
          assigned role.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>

          <SelectContent>
            {users.map((user: any) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.username} — {user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedUser && (
          <>
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
              <div>
                <p className="font-medium">{selectedUser.username}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.email}
                </p>
              </div>

              <Badge>
                {selectedUser.role?.name ?? selectedUser.role ?? "No role"}
              </Badge>
            </div>

            {permissionsLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading permissions...
              </p>
            ) : Object.keys(groupedPermissions).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                This user has no permissions.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(groupedPermissions).map(
                  ([resource, actions]) => (
                    <div key={resource} className="rounded-lg border p-4">
                      <div className="mb-3">
                        <p className="font-medium capitalize">{resource}</p>
                        <p className="text-xs text-muted-foreground">
                          {actions.length} permissions
                        </p>
                      </div>

                      <div className="space-y-2">
                        {actions.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                              <Check className="size-3 text-primary" />
                            </div>
                            <span className="capitalize">{item.action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}