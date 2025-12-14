'use client';

import z from 'zod';
import useSWRMutation from 'swr/mutation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createWorkspaceSchema } from '../schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DottedSeparator } from '@/components/dotted-separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { axios } from '@/lib/axios';

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const CreateWorkspaceForm = ({
  onCancel,
  onSuccess,
}: CreateWorkspaceFormProps) => {
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    '/v1/workspace',
    async (
      url: string,
      { arg }: { arg: z.infer<typeof createWorkspaceSchema> },
    ) => {
      const resp = await axios.post<ApiResponse<null>>(url, arg);
      return resp.data;
    },
    {
      // بعد از موفقیت، کش لیست workspaceها را revalidate کن
      onSuccess: (data) => {
        toast.success(data?.message ?? 'Workspace is created successfully!');

        form.reset();
        onSuccess?.(); // مثلاً modal بسته بشه

        // revalidate لیست workspaceها (کلید دقیقاً همون کلید useSWR در صفحه لیست)
        // اگر در جای دیگه از useSWR('/v1/workspace') استفاده کردید
        // این کار لیست را به‌روز می‌کنه
        // import { mutate } from 'swr' در سطح global
        import('swr').then(({ mutate }) => {
          mutate(
            (key) => typeof key === 'string' && key.startsWith('/v1/workspace'),
          );
        });
      },
      onError: (err: any) => {
        const errMsg =
          (err.response?.data as ErrorResponse)?.message ?? 'Server Error!';
        toast.error(errMsg);
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof createWorkspaceSchema>) => {
    await trigger(values);
  };

  return (
    <Card className="w-full h-full border-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              {/* Workspace name input */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter workspace name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                type="button"
                size="lg"
                onClick={onCancel}
                disabled={isMutating}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isMutating}>
                {isMutating ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
