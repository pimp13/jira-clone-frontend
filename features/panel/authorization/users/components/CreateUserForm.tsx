"use client";

import { useMemo } from "react";
import {
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { CreateUserFormInput, CreateUserFormValues, createUserSchema } from "../schemas";
import { useCreateUser } from "../hooks/use-create-user";
import { useRoles } from "../../roles/hooks/use-roles";

type CreateUserFormProps = {
  close: () => void;
}


export function CreateUserForm({
  close,
}: CreateUserFormProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const defaultValues = useMemo<CreateUserFormInput>(
    () => ({
      name: "",
      username: "",
      email: "",
      password: "",
      roleId: '',
      isActive: true,
    }),
    []
  );

  const createUserMutation = useCreateUser();
  const { data: roles, isPending: rolesPending } = useRoles();


  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues,
  });

  const onSubmit = async (values: CreateUserFormValues) => {
    try {
      await createUserMutation.mutateAsync({
        ...values,
        roleId: Number(values.roleId),
      });

      toast.success("User created successfully!");
      form.reset();
      close();
    } catch (error) {
      console.error("Failed to create user:", error);
      toast.error("Failed to create user. Please try again.");
    }
  };

  if (rolesPending) return <p>Loading roles...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
          <div className="flex size-10 items-center justify-center rounded-lg border bg-background">
            <UserPlus className="size-5 text-muted-foreground" />
          </div>

          <div>
            <p className="font-medium">
              New User
            </p>

            <p className="text-sm text-muted-foreground">
              Create an account and assign a role.
            </p>
          </div>
        </div>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="john.doe"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>

              <p className="text-xs text-muted-foreground">
                Use letters, numbers, dots, underscores
                or hyphens.
              </p>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pr-10"
                    {...field}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}

                    <span className="sr-only">
                      {showPassword
                        ? "Hide password"
                        : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>

              <p className="text-xs text-muted-foreground">
                Password must contain at least 8
                characters.
              </p>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Role
              </FormLabel>

              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {roles && roles.map((role) => (
                    <SelectItem
                      key={role.id}
                      value={String(role.id)}
                    >
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-xs text-muted-foreground">
                The role determines what this user can
                access.
              </p>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <div className="space-y-1">
                  <FormLabel className="cursor-pointer">
                    Active account
                  </FormLabel>

                  <p className="text-xs text-muted-foreground">
                    The user will be able to sign in
                    immediately after creation.
                  </p>
                </div>
              </div>

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
              : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
}