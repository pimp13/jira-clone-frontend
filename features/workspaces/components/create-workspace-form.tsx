'use client';

import z from 'zod';
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
import toast from 'react-hot-toast';

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof createWorkspaceSchema>) => {
    try {
      const resp = await axios.post<ApiResponse<null>>('/v1/workspace', values);
      if (resp.status === 201) {
        toast.success(resp.data?.message ?? 'Login is successfully!');
        form.reset();
      }
    } catch (err: any) {
      const errMsg =
        (err.response?.data as ErrorResponse)?.message ?? 'Server Error!!';
      toast.error(errMsg);
    }
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
              >
                Cancel
              </Button>
              <Button type="submit" size="lg">
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
