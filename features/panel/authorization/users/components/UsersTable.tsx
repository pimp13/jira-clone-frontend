"use client";

import {
  MoreHorizontal,
  UserRound,
  ShieldCheck,
  KeyRound,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
  Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/app/panel/authorization/users/page";


interface UsersTableProps {
  users: User[];
}

function getInitials(
  name: string | null,
  username: string
) {
  if (name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  return username.slice(0, 2).toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

export function UsersTable({
  users,
}: UsersTableProps) {
  const handleDeleteUser = (user: User) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.username}?`
    );

    if (!confirmed) {
      return;
    }

    console.log("Delete user:", user.id);
  };

  const handleToggleStatus = (user: User) => {
    console.log(
      user.isActive
        ? "Deactivate user:"
        : "Activate user:",
      user.id
    );
  };

  const handleResetPassword = (user: User) => {
    console.log(
      "Reset password:",
      user.id
    );
  };

  const handleChangeRole = (user: User) => {
    console.log(
      "Change role:",
      user.id
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>

            <TableHead>Role</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Joined</TableHead>

            <TableHead className="hidden lg:table-cell">
              User ID
            </TableHead>

            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="group"
              >
                {/* User */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 text-xs font-semibold">
                      {getInitials(
                        user.name,
                        user.username
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">
                          {user.name ||
                            user.username}
                        </span>
                      </div>

                      <div className="truncate text-xs text-muted-foreground">
                        @{user.username}
                      </div>

                      <div className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className="gap-1.5"
                  >
                    <ShieldCheck className="size-3" />

                    {user.role.name}
                  </Badge>
                </TableCell>

                {/* Status */}
                <TableCell>
                  {user.isActive ? (
                    <Badge
                      variant="outline"
                      className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                    >
                      <span className="size-1.5 rounded-full bg-emerald-500" />

                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="gap-1.5 border-destructive/30 bg-destructive/10 text-destructive"
                    >
                      <span className="size-1.5 rounded-full bg-destructive" />

                      Inactive
                    </Badge>
                  )}
                </TableCell>

                {/* Created */}
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </span>
                </TableCell>

                {/* ID */}
                <TableCell className="hidden lg:table-cell">
                  <span className="font-mono text-xs text-muted-foreground">
                    #{user.id}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <MoreHorizontal className="size-4" />

                        <span className="sr-only">
                          Open actions
                        </span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-52"
                    >
                      {/* View */}
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          console.log(
                            "View user:",
                            user.id
                          )
                        }
                      >
                        <Eye className="mr-2 size-4" />

                        View User
                      </DropdownMenuItem>

                      {/* Edit */}
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          console.log(
                            "Edit user:",
                            user.id
                          )
                        }
                      >
                        <Pencil className="mr-2 size-4" />

                        Edit User
                      </DropdownMenuItem>

                      {/* Change Role */}
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleChangeRole(user)
                        }
                      >
                        <ShieldCheck className="mr-2 size-4" />

                        Change Role
                      </DropdownMenuItem>

                      {/* Reset password */}
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleResetPassword(user)
                        }
                      >
                        <KeyRound className="mr-2 size-4" />

                        Reset Password
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Activate / deactivate */}
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleToggleStatus(user)
                        }
                      >
                        {user.isActive ? (
                          <>
                            <UserX className="mr-2 size-4" />

                            Deactivate User
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 size-4" />

                            Activate User
                          </>
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Delete */}
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onClick={() =>
                          handleDeleteUser(user)
                        }
                      >
                        <Trash2 className="mr-2 size-4" />

                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-40 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full border bg-muted/40">
                    <UserRound className="size-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="font-medium">
                      No users found
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Try changing your search or
                      filter criteria.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}