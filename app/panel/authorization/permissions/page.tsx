"use client";

import { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  ShieldCheck,
  Users,
  Plus,
  Shield,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PermissionCatalog } from "../../../../features/panel/authorization/permissions/_components/PermissionCatalog";
import { RolePermissions } from "../../../../features/panel/authorization/permissions/_components/RolePermissions";
import { UserPermissions } from "../../../../features/panel/authorization/permissions/_components/UserPermissions";
import { ResponsiveModal } from "@/app/dashboard/(panel)/components/responsive-modal";
import { CreatePermissionForm } from "@/features/panel/authorization/permissions/_components/CreatePermissionForm";

export default function PermissionsPage() {
  const [activeTab, setActiveTab] = useState("permissions");
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        {/* <div className="hidden md:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Shield className="size-5" />

              <h1 className="text-2xl font-semibold tracking-tight">
                Roles
              </h1>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage roles and control what users can access.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/panel/authorization/roles" className="underline">
              <Button>Roles</Button>
            </Link>
            <Link href="/panel/authorization/users" className="underline">
              <Button>Users</Button>
            </Link>
            <Button onClick={() => setIsOpenModal(true)}>
              <Plus className="mr-2 size-4" />
              Create Permission
            </Button>
          </div>
        </div> */}

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5" />

                  <h1 className="text-2xl font-semibold tracking-tight">
                    Permissions
                  </h1>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Define permissions and control access across your application.
                </p>
              </div>

              <Button onClick={() => setIsOpenModal(true)}>
                <Plus className="mr-2 size-4" />
                Create Permission
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full max-w-xl grid-cols-3">
                  <TabsTrigger value="permissions" className="text-neutral-700">
                    <KeyRound className="mr-2 size-4" />
                    Permissions
                  </TabsTrigger>

                  <TabsTrigger value="roles" className="text-neutral-700">
                    <ShieldCheck className="mr-2 size-4" />
                    Role Access
                  </TabsTrigger>

                  <TabsTrigger value="users" className="text-neutral-700">
                    <Users className="mr-2 size-4" />
                    User Access
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="permissions" className="mt-6">
                  <PermissionCatalog />
                </TabsContent>

                <TabsContent value="roles" className="mt-6">
                  <RolePermissions />
                </TabsContent>

                <TabsContent value="users" className="mt-6">
                  <UserPermissions />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      <ResponsiveModal onOpenChange={() => setIsOpenModal(prev => !prev)} open={isOpenModal}>
        <div className="py-10 px-5">
          <CreatePermissionForm close={() => setIsOpenModal(prev => !prev)} />
        </div>
      </ResponsiveModal>
    </>
  )
}