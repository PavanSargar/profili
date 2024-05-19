"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Separator } from "@components/ui/separator";
import { loginSchema } from "../schema";

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const session = useSession();

  const isAuthenticated = session.status === "authenticated";

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     redirect("/");
  //   }
  // }, [isAuthenticated, session]);

  const [credError, setCredError] = useState<string>("");

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { email, password } = data;
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.status === 401 || res === undefined || !res) {
      setCredError(
        "Incorrect email or password. Please try again with correct credentials."
      );
      setLoading(false);
    }

    if (res?.ok) {
      router.refresh();
    }
  };
  return (
    <div className="flex items-center justify-center lg:h-[100svh] p-6 lg:p-0">
      <form
        className="flex flex-col gap-2 w-auto lg:w-[400px] border border-muted border-1 rounded-xl p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("email", { required: true })}
          error={errors.email?.message}
          placeholder="Enter Email"
          name="email"
          label="Email"
          type="email"
          className="text-sm w-full"
          disabled={loading}
        />
        <Input
          {...register("password", { required: true })}
          error={errors.password?.message}
          placeholder="Enter Password"
          type="password"
          name="password"
          label="password"
          className="text-sm w-full"
          disabled={loading}
        />
        {credError?.length > 0 && (
          <p className="text-red-500 text-sm w-2/3">{credError}</p>
        )}
        <div className="flex items-center justify-between">
          <Link
            className="underline text-sm text-muted-foreground"
            href="/register"
          >
            Don't have an account?
          </Link>
          <Link
            className="underline text-sm text-muted-foreground"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-4">
          <Button
            size="sm"
            className="w-full text-sm"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
          <Separator className="my-4 bg-gray-400" />
          <Button
            type="button"
            size="sm"
            className="w-full mb-2 flex items-center gap-2 text-sm"
            onClick={() => signIn("google")}
            disabled={loading}
          >
            <FcGoogle size="1.6rem" /> Login with Google
          </Button>
          <Button
            type="button"
            size="sm"
            className="w-full flex items-center gap-2 text-sm"
            variant="outline"
            onClick={() => signIn("github")}
            disabled={loading}
          >
            <FaGithub size="1.6rem" /> Login with GitHub
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
