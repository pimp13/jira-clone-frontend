"use client";

import { useMemo, useState } from "react";
import {
  KeyRound,
  MoreHorizontal,
  Search,
  Trash2,
  Pencil,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const permissions = [
  {
    id: 1,
    name: "users.create",
    resource: "users",
    action: "create",
    description: "Create new users",
  },
  {
    id: 2,
    name: "users.read",
    resource: "users",
    action: "read",
    description: "View users",
  },
  {
    id: 3,
    name: "users.update",
    resource: "users",
    action: "update",
    description: "Update users",
  },
  {
    id: 4,
    name: "users.delete",
    resource: "users",
    action: "delete",
    description: "Delete users",
  },
  {
    id: 5,
    name: "posts.create",
    resource: "posts",
    action: "create",
    description: "Create posts",
  },
  {
    id: 6,
    name: "posts.read",
    resource: "posts",
    action: "read",
    description: "View posts",
  },
  {
    id: 7,
    name: "posts.update",
    resource: "posts",
    action: "update",
    description: "Update posts",
  },
  {
    id: 8,
    name: "posts.delete",
    resource: "posts",
    action: "delete",
    description: "Delete posts",
  },
];

export function PermissionCatalog() {
  const [search, setSearch] = useState("");

  const filteredPermissions = useMemo(() => {
    const value = search.toLowerCase();

    return permissions.filter(
      (permission) =>
        permission.name.toLowerCase().includes(value) ||
        permission.resource.toLowerCase().includes(value) ||
        permission.action.toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Permission Catalog</CardTitle>

            <CardDescription>
              Define the individual actions that can be assigned to roles.
            </CardDescription>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search permissions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-md border bg-muted/50">
                        <KeyRound className="size-4 text-muted-foreground" />
                      </div>

                      <div>
                        <div className="font-medium">
                          {permission.name}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          ID: {permission.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {permission.resource}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {permission.action}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {permission.description}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      3 roles
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 size-4" />
                          Edit Permission
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          Delete Permission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}