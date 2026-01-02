'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { axios } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';
import z from 'zod';
import { createWorkspaceSchema } from '../schemas';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const CreateWorkspaceForm = ({
  onCancel,
  onSuccess,
}: CreateWorkspaceFormProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      image: null,
      imageUrl: null,
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    '/v1/workspace',
    async (
      url: string,
      { arg }: { arg: z.infer<typeof createWorkspaceSchema> },
    ) => {
      const formData = new FormData();
      formData.append('name', arg.name);
      if (arg.imageUrl instanceof File) {
        formData.append('image', arg.imageUrl);
      }

      const resp = await axios.post<ApiResponse<{ id: string }>>(
        url,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return resp.data;
    },
    {
      // بعد از موفقیت، کش لیست workspaceها را revalidate کن
      onSuccess: (data: ApiResponse<{ id: string }>) => {
        if (data.ok) {
          console.info('data onSuccess =>', data);
          toast.success(data?.message ?? 'Workspace is created successfully!');
          form.reset();
          // onSuccess?.();

          // revalidate لیست workspaceها (کلید دقیقاً همون کلید useSWR در صفحه لیست)
          // اگر در جای دیگه از useSWR('/v1/workspace') استفاده کردید
          // این کار لیست را به‌روز می‌کنه
          // import { mutate } from 'swr' در سطح global
          import('swr').then(({ mutate }) => {
            mutate(
              (key) =>
                typeof key === 'string' && key.startsWith('/v1/workspace'),
            );
          });

          // redirect to show workspace by id
          router.push(`/dashboard/workspaces/${data.data?.id}`);
        }
      },
      onError: (err: any) => {
        const errMsg =
          (err.response?.data as ErrorResponse)?.message ?? 'Server Error!';
        toast.error(errMsg);
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      // image: values.imageUrl instanceof File ? values.imageUrl : '',
    };

    await trigger(finalValues);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('imageUrl', file);
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
              {/* Handle input */}
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

              {/* Image file input */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col gap-y-2">
                        <p className="text-sm font-medium">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG, max size 1MB
                        </p>
                        <input
                          hidden
                          accept=".jpg, .png, .svg, .jpeg"
                          type="file"
                          onChange={handleImageChange}
                          ref={inputRef}
                          disabled={isMutating}
                        />
                        <Button
                          type="button"
                          onClick={() => inputRef.current?.click()}
                          disabled={isMutating}
                          variant="teritary"
                          size="xs"
                          // className="w-fit mt-2"
                        >
                          <UploadIcon className="size-4" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
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
                className={cn(onCancel ? 'visible' : 'invisible')}
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
