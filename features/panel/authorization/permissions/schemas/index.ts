import { z } from "zod";

export const createPermissionSchema = z.object({
  name: z
    .string()
    .min(1, "Permission name is required")
    .regex(
      /^[a-z0-9]+(\.[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and dots (e.g. users.create)"
    ),
  resource: z
    .string()
    .min(1, "Resource is required")
    .regex(/^[a-z0-9_-]+$/, "Only lowercase letters, numbers, _ and -"),
  action: z
    .string()
    .min(1, "Action is required")
    .regex(/^[a-z0-9_-]+$/, "Only lowercase letters, numbers, _ and -"),
  description: z.string().optional(),
});

export type CreatePermissionFormInput = z.input<typeof createPermissionSchema>;
export type CreatePermissionFormValues = z.output<typeof createPermissionSchema>;