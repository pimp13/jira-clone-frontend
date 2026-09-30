"use client";

import { useMemo, useState } from "react";
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

const users = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    role: "Administrator",
  },
  {
    id: 2,
    username: "john",
    email: "john@example.com",
    role: "Editor",
  },
  {
    id: 3,
    username: "alice",
    email: "alice@example.com",
    role: "Author",
  },
];

const rolePermissions = {
  Administrator: [
    "users.create",
    "users.read",
    "users.update",
    "users.delete",
    "posts.create",
    "posts.read",
    "posts.update",
    "posts.delete",
    "roles.create",
    "roles.read",
    "roles.update",
    "roles.delete",
  ],

  Editor: [
    "users.read",
    "users.update",
    "posts.create",
    "posts.read",
    "posts.update",
    "roles.read",
  ],

  Author: [
    "posts.create",
    "posts.read",
  ],
};

export function UserPermissions() {
  const [selectedUser, setSelectedUser] = useState("1");

  const user = users.find(
    (user) => String(user.id) === selectedUser
  );

  const permissions =
    rolePermissions[
    user?.role as keyof typeof rolePermissions
    ] ?? [];

  const groupedPermissions = useMemo(() => {
    return permissions.reduce<Record<string, string[]>>(
      (groups, permission) => {
        const [resource, action] =
          permission.split(".");

        if (!groups[resource]) {
          groups[resource] = [];
        }

        groups[resource].push(action);

        return groups;
      },
      {}
    );
  }, [permissions]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserRound className="size-5" />

          <CardTitle>
            User Access
          </CardTitle>
        </div>

        <p className="text-sm text-muted-foreground">
          View the effective permissions inherited by a user
          through their assigned role.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">

        <Select
          value={selectedUser}
          onValueChange={setSelectedUser}
        >
          <SelectTrigger className="max-w-md">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {users.map((user) => (
              <SelectItem
                key={user.id}
                value={String(user.id)}
              >
                {user.username} — {user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {user && (
          <>
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
              <div>
                <p className="font-medium">
                  {user.username}
                </p>

                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <Badge>
                {user.role}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(
                groupedPermissions
              ).map(([resource, actions]) => (
                <div
                  key={resource}
                  className="rounded-lg border p-4"
                >
                  <div className="mb-3">
                    <p className="font-medium capitalize">
                      {resource}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {actions.length} permissions
                    </p>
                  </div>

                  <div className="space-y-2">
                    {actions.map((action) => (
                      <div
                        key={action}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                          <Check className="size-3 text-primary" />
                        </div>

                        <span className="capitalize">
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}