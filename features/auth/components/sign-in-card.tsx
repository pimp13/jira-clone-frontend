'use client';

import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { DottedSeparator } from '@/components/dotted-separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { axios } from '@/lib/axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email(),
  password: z.string().min(8, 'Password must be more than 8 characters.'),
});

export const SignInCard = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const resp = await axios.post<ApiResponse<null>>(
        '/v1/auth/login',
        values,
      );

      if (resp.status === 201) {
        toast.success(resp.data?.message ?? 'Login is successfully!');
        router.push('/dashboard');
      }
    } catch (err: any) {
      const errMsg =
        (err.response?.data as ErrorResponse)?.message ?? 'Server Error!!';
      toast.error(errMsg);
    }
  };

  return (
    <>
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center p-7">
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>

        <div className="px-7">
          <DottedSeparator />
        </div>

        <CardContent className="p-7">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email input */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password input */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={false} size="lg" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button
            disabled={false}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <FcGoogle className="mr-2 size-5" />
            Login with Google
          </Button>
          <Button
            disabled={false}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <FaGithub className="mr-2 size-5" />
            Login with Google
          </Button>
        </CardContent>

        <div className="px-7">
          <DottedSeparator />
        </div>

        <CardContent className="px-7 flex items-center justify-center">
          <p>
            Don&apos;t have an account?
            <Link href="/sign-up">
              <span className="text-blue-700">&nbsp;Sign Up</span>
            </Link>
          </p>
        </CardContent>
      </Card>

      <Toaster
        gutter={8}
        toastOptions={{
          className: 'text-[0.9rem]',
        }}
      />
    </>
  );
};
