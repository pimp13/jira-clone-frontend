"use client";

import { useEffect, useMemo, useState } from "react";
import { Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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

import { usePermissions } from "../hooks/use-permissions";
import { useUpdateRolePermissions } from "../hooks/use-update-role-permissions";
import { useRoles } from "../../roles/hooks/use-roles";

export function RolePermissions() {
  const { data: roles, isPending: rolesLoading } = useRoles();
  const { data: permissions, isPending: permissionsLoading } = usePermissions();
  const updateMutation = useUpdateRolePermissions();

  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  // state فعلی چک‌باکس‌ها
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<number>>(
    new Set()
  );
  // state اولیه (برای محاسبه diff)
  const [initialPermissionIds, setInitialPermissionIds] = useState<Set<number>>(
    new Set()
  );

  // وقتی رول‌ها لود شدن، اولین رول رو انتخاب کن
  useEffect(() => {
    if (roles && roles.length > 0 && !selectedRoleId) {
      setSelectedRoleId(String(roles[0].id));
    }
  }, [roles, selectedRoleId]);

  // وقتی رول عوض شد، پرمیشن‌های اون رول رو ست کن
  useEffect(() => {
    if (!roles || !selectedRoleId) return;

    const role = roles.find((r) => String(r.id) === selectedRoleId);
    if (!role) return;

    // فرض: role.permissions = [{ permission: { id, name, ... } }, ...]
    const ids = new Set(
      role.permissions?.map((rp: any) => rp.permission.id) ?? []
    );

    setSelectedPermissionIds(new Set(ids));
    setInitialPermissionIds(new Set(ids));
  }, [roles, selectedRoleId]);

  const groupedPermissions = useMemo(() => {
    if (!permissions) return {};

    return permissions.reduce<Record<string, typeof permissions>>(
      (groups, permission) => {
        const key = permission.resource;
        if (!groups[key]) groups[key] = [];
        groups[key].push(permission);
        return groups;
      },
      {}
    );
  }, [permissions]);

  const togglePermission = (permissionId: number) => {
    setSelectedPermissionIds((current) => {
      const next = new Set(current);
      if (next.has(permissionId)) next.delete(permissionId);
      else next.add(permissionId);
      return next;
    });
  };

  const toggleResource = (resource: string) => {
    const resourcePermissions = groupedPermissions[resource] ?? [];
    const allSelected = resourcePermissions.every((p) =>
      selectedPermissionIds.has(p.id)
    );

    setSelectedPermissionIds((current) => {
      const next = new Set(current);
      resourcePermissions.forEach((p) => {
        if (allSelected) next.delete(p.id);
        else next.add(p.id);
      });
      return next;
    });
  };

  const handleSave = async () => {
    if (!selectedRoleId) return;

    const roleId = Number(selectedRoleId);

    const toAdd = [...selectedPermissionIds].filter(
      (id) => !initialPermissionIds.has(id)
    );
    const toRemove = [...initialPermissionIds].filter(
      (id) => !selectedPermissionIds.has(id)
    );

    if (toAdd.length === 0 && toRemove.length === 0) {
      toast.info("No changes to save");
      return;
    }

    try {
      await updateMutation.mutateAsync({ roleId, toAdd, toRemove });
      // بعد از موفقیت، initial رو آپدیت کن
      setInitialPermissionIds(new Set(selectedPermissionIds));
      toast.success("Permissions updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update permissions");
    }
  };

  const hasChanges =
    selectedPermissionIds.size !== initialPermissionIds.size ||
    [...selectedPermissionIds].some((id) => !initialPermissionIds.has(id));

  if (rolesLoading || permissionsLoading) {
    return <p className="p-6 text-muted-foreground">Loading...</p>;
  }

  if (!roles?.length) {
    return <p className="p-6 text-muted-foreground">No roles found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5" />
              <CardTitle>Role Permissions</CardTitle>
            </div>
            <CardDescription className="mt-1">
              Select which permissions this role is allowed to use.
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleSave}
              disabled={!hasChanges || updateMutation.isPending}
            >
              <Save className="mr-2 size-4" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-5 flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
          <div>
            <p className="text-sm font-medium">
              {roles.find((r) => String(r.id) === selectedRoleId)?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              Permissions assigned to this role
            </p>
          </div>
          <Badge variant="secondary">
            {selectedPermissionIds.size} permissions
          </Badge>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedPermissions).map(
            ([resource, resourcePermissions]) => {
              const allSelected = resourcePermissions.every((p) =>
                selectedPermissionIds.has(p.id)
              );
              const someSelected = resourcePermissions.some((p) =>
                selectedPermissionIds.has(p.id)
              );

              return (
                <div key={resource} className="rounded-lg border">
                  <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                    <div>
                      <p className="font-medium capitalize">{resource}</p>
                      <p className="text-xs text-muted-foreground">
                        Manage {resource.toLowerCase()} access
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {
                          resourcePermissions.filter((p) =>
                            selectedPermissionIds.has(p.id)
                          ).length
                        }
                        /{resourcePermissions.length}
                      </span>

                      <Checkbox
                        checked={
                          allSelected
                            ? true
                            : someSelected
                              ? "indeterminate"
                              : false
                        }
                        onCheckedChange={() => toggleResource(resource)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-1 p-2 sm:grid-cols-2 lg:grid-cols-4">
                    {resourcePermissions.map((permission) => (
                      <label
                        key={permission.id}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={selectedPermissionIds.has(permission.id)}
                          onCheckedChange={() =>
                            togglePermission(permission.id)
                          }
                        />
                        <div>
                          <p className="text-sm font-medium capitalize">
                            {permission.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {permission.name}
                          </p>
                        </div>
                      </label>
                    ))}
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