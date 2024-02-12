"use client";

import React, { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";

import { handleCredentialsLogin } from "@/app/auth/login/_login";
import { useGlobalStore } from "@/lib/store";

const setCount = () => {
  useGlobalStore.setState({ count: 1 });
};

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters long.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setLoading(true);
      await handleCredentialsLogin({
        username: values.username,
        password: values.password,
      });
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error(error);
      setLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={cn(
                    fieldState.invalid
                      ? "border-red-400 bg-red-50 placeholder:text-red-500"
                      : "",
                  )}
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  className={cn(
                    fieldState.invalid
                      ? "border-red-400 bg-red-50 placeholder:text-red-500"
                      : "",
                  )}
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-10">
          <Link className="self-end" href="/auth/forgot-password">
            <Button className="m-0 h-0 p-0" type="button" variant="link">
              Forgot Password?
            </Button>
          </Link>
          <Button className="w-full" size="lg" type="submit" disabled={loading}>
            Log in {loading && "..."}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
