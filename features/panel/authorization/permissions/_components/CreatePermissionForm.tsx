"use client";

import { useMemo } from "react";
import { KeyRound } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // اگر ندارید از Input استفاده کنید

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  CreatePermissionFormInput,
  CreatePermissionFormValues,
  createPermissionSchema,
} from "../schemas";
import { useCreatePermission } from "../hooks/use-create-permission";

type CreatePermissionFormProps = {
  close: () => void;
};

export function CreatePermissionForm({ close }: CreatePermissionFormProps) {
  const defaultValues = useMemo<CreatePermissionFormInput>(
    () => ({
      name: "",
      resource: "",
      action: "",
      description: "",
    }),
    []
  );

  const createPermissionMutation = useCreatePermission();

  const form = useForm<CreatePermissionFormValues>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues,
  });

  const onSubmit = async (values: CreatePermissionFormValues) => {
    try {
      await createPermissionMutation.mutateAsync(values);

      toast.success("Permission created successfully!");
      form.reset();
      close();
    } catch (error) {
      console.error("Failed to create permission:", error);
      toast.error("Failed to create permission. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
          <div className="flex size-10 items-center justify-center rounded-lg border bg-background">
            <KeyRound className="size-5 text-muted-foreground" />
          </div>

          <div>
            <p className="font-medium">New Permission</p>
            <p className="text-sm text-muted-foreground">
              Define a new permission that can be assigned to roles.
            </p>
          </div>
        </div>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permission Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="users.create"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Use the format: resource.action (e.g. users.create)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resource */}
        <FormField
          control={form.control}
          name="resource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource</FormLabel>
              <FormControl>
                <Input
                  placeholder="users"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                The entity this permission applies to (e.g. users, posts, roles)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action */}
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <FormControl>
                <Input
                  placeholder="create"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                The action allowed (e.g. create, read, update, delete)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Allows creating new users"
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Optional short description of what this permission does.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={close}
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating..."
              : "Create Permission"}
          </Button>
        </div>
      </form>
    </Form>
  );
}