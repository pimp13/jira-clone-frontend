import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .max(100, "Name must be less than 100 characters")
    .optional(),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "Username can only contain letters, numbers, dots, underscores and hyphens"
    ),

  email: z.string().email("Please enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  roleId: z.string().min(1, "Please select a role"),

  isActive: z.boolean(),
});

export type CreateUserFormInput = z.input<typeof createUserSchema>;
export type CreateUserFormValues = z.output<typeof createUserSchema>;