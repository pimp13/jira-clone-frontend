import { optional, z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(3, 'Name min len is 3 char'),
  imageUrl: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional()
    .nullable(),
  image: z.file().nullable(),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Must be 1 or more characters')
    .min(3, 'Name min len is 3 char')
    .optional(),
  imageUrl: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional()
    .nullable(),
  image: z.file().nullable(),
});
