"use client";

import { useEffect, useMemo, useState } from "react";
import {
  UserRound,
  Plus,
  Search,
  UsersRound,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
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

import { BeautifulModal } from "@/components/BeautifulModal";
import { useModalStore } from "@/stores/useModalStore";
import { UsersTable } from "@/features/panel/authorization/users/components/UsersTable";
import { CreateUserForm } from "@/features/panel/authorization/users/components/CreateUserForm";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersAll } from "@/features/panel/authorization/users/backend-provider/users-backend-provider";


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

const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "john",
    email: "john@example.com",
    isActive: true,
    roleId: 1,
    role: {
      id: 1,
      name: "Administrator",
    },
    createdAt: "2026-09-24T10:30:00.000Z",
  },
  {
    id: 2,
    name: "Sarah Smith",
    username: "sarah",
    email: "sarah@example.com",
    isActive: true,
    roleId: 2,
    role: {
      id: 2,
      name: "Editor",
    },
    createdAt: "2026-09-21T12:20:00.000Z",
  },
  {
    id: 3,
    name: "Alex Brown",
    username: "alex",
    email: "alex@example.com",
    isActive: false,
    roleId: 3,
    role: {
      id: 3,
      name: "Author",
    },
    createdAt: "2026-09-18T09:10:00.000Z",
  },
  {
    id: 4,
    name: "Michael Wilson",
    username: "michael",
    email: "michael@example.com",
    isActive: true,
    roleId: 3,
    role: {
      id: 3,
      name: "Author",
    },
    createdAt: "2026-09-15T15:45:00.000Z",
  },
  {
    id: 5,
    name: "Emma Davis",
    username: "emma",
    email: "emma@example.com",
    isActive: true,
    roleId: 2,
    role: {
      id: 2,
      name: "Editor",
    },
    createdAt: "2026-09-10T11:15:00.000Z",
  },
  {
    id: 6,
    name: null,
    username: "developer",
    email: "developer@example.com",
    isActive: true,
    roleId: 3,
    role: {
      id: 3,
      name: "Author",
    },
    createdAt: "2026-09-08T08:30:00.000Z",
  },
];

export default function UsersPage() {
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);
  const openModal = useModalStore((state) => state.openModal);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: users,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersAll,
  });



  const roles = useMemo(() => {
    const uniqueRoles = new Map<number, string>();

    users?.forEach((user) => {
      uniqueRoles.set(user.role.id, user.role.name);
    });

    return Array.from(uniqueRoles.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }, [users]);

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return users?.filter((user) => {
      const matchesSearch =
        !value ||
        user.name?.toLowerCase().includes(value) ||
        user.username.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.role.name.toLowerCase().includes(value);

      const matchesRole =
        roleFilter === "all" ||
        String(user.roleId) === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, roleFilter, statusFilter]);



  const totalUsers = users?.length;

  const activeUsers = users?.filter(
    (user) => user.isActive
  ).length;

  const inactiveUsers = users?.filter(
    (user) => !user.isActive
  ).length;

  const adminUsers = users?.filter(
    (user) =>
      user.role.name.toLowerCase() === "administrator"
  ).length;

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <UserRound className="size-5" />

              <h1 className="text-2xl font-semibold tracking-tight">
                Users
              </h1>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage users, roles and account access.
            </p>
          </div>

          <Button
            onClick={() => open("create-user")}
          >
            <Plus className="mr-2 size-4" />
            Create User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Users
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {totalUsers}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-lg border bg-muted/40">
                <UsersRound className="size-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Users
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {activeUsers}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-lg border bg-muted/40">
                <UserCheck className="size-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Inactive Users
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {inactiveUsers}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-lg border bg-muted/40">
                <UserX className="size-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Administrators
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {adminUsers}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-lg border bg-muted/40">
                <ShieldCheck className="size-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>All Users</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Create, edit and manage application users.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    className="pl-9"
                  />
                </div>

                {/* Role */}
                <Select
                  value={roleFilter}
                  onValueChange={setRoleFilter}
                >
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All roles
                    </SelectItem>

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

                {/* Status */}
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All status
                    </SelectItem>

                    <SelectItem value="active">
                      Active
                    </SelectItem>

                    <SelectItem value="inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <UsersTable users={filteredUsers || []} />

            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing{" "}
                <span className="font-medium">
                  {filteredUsers?.length}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {users?.length}
                </span>{" "}
                users
              </span>

              {(search ||
                roleFilter !== "all" ||
                statusFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      setRoleFilter("all");
                      setStatusFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create User Modal */}
      <BeautifulModal
        open={openModal === "create-user"}
        onOpenChange={(isOpen) =>
          !isOpen && close()
        }
        title="Create User"
        description="Create a new user and assign a role."
        isShowBtns={false}
      >
        <CreateUserForm close={close} />
      </BeautifulModal>
    </>
  );
}