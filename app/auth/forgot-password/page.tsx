"use client";

import React from "react";
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
import { cn } from "@/lib/utils";

// Define the schema for the forgot password form with a user-friendly error message for the email field.
const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Email address is required.",
    }),
});

const ForgotPasswordPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8">
        <div className="space-y-2.5">
          <h1 className="text-2xl font-bold leading-10">Forgot password?</h1>
          <p className="text-sm leading-snug text-gray-500">
            All good, Enter your account’s email address and we’ll send you a
            link to reset your password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={cn(
                        fieldState.invalid
                          ? "border-red-400 bg-red-50 placeholder:text-red-500"
                          : "",
                      )}
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="space-y-1.5">
              <Button className="w-full" size="lg" type="submit">
                Submit
              </Button>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">Already have an account?</span>
                <Button className="m-0 h-0 p-0" type="button" variant="link">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
