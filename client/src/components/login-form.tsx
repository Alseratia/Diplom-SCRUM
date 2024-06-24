"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/app/providers";
import { handleRegister } from "@/app/auth/register/actions";
import { handleLogin } from "@/app/auth/login/actions";

export function LoginForm() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname.includes("login");

  const { toggleIsLoggedIn } = useContext(AuthContext);

  const { mutate: login } = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      toggleIsLoggedIn(data);
      void router.push("/");
    },
  });
  const { mutate: register } = useMutation({
    mutationFn: handleRegister,
    onSuccess: (data) => {
      toggleIsLoggedIn(data);
      void router.push("/");
    },
  });

  const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    if (isLoginPage) {
      return void login({ email, password });
    }
    return void register({ email, password });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[30rem] space-y-8 rounded-xl border border-neutral-600 px-10 py-6"
      >
        <h1 className="text-2xl font-bold text-neutral-950">
          {isLoginPage ? "Войти в систему" : "Зарегистрироваться"}
        </h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="E-mail" {...field} required />
              </FormControl>
              <FormDescription>Введите ваш email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} required />
              </FormControl>
              <FormDescription>Введите ваш пароль.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-16">
          {isLoginPage && (
            <Link
              href={"/auth/register"}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-neutral-950 underline ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Зарегистрироваться
            </Link>
          )}
          <Button type="submit">
            {isLoginPage ? "Войти" : "Зарегистрироваться"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
