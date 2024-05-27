"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Separator } from "@components/ui/separator";
import { RegisterFormValues, registerSchema } from "../auth.schema";
import { useRegisterUser } from "../auth.service";

type Props = {};

const RegisterForm = (props: Props) => {
  const { mutate, error, isPending, isSuccess } = useRegisterUser();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const isAuthenticated = session.status === "authenticated";
    if (isAuthenticated) {
      redirect("/");
    }

    if (isSuccess) {
      router.push("/login");
    }
  }, [session, isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center p-6 ">
      <form
        className="flex flex-col gap-2 w-auto lg:w-[400px] xl:w-1/3 border border-muted border-1 rounded-xl p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2">
          <Input
            {...register("firstName", { required: true })}
            error={errors.firstName?.message}
            placeholder="Enter First Name"
            name="firstName"
            label="First name"
            type="text"
            className="text-sm w-full"
            disabled={isPending}
          />
          <Input
            {...register("lastName", { required: true })}
            error={errors.lastName?.message}
            placeholder="Enter Last Name"
            name="lastName"
            label="Last name"
            type="text"
            className="text-sm w-full"
            disabled={isPending}
          />
        </div>

        <Input
          {...register("email", { required: true })}
          error={errors.email?.message}
          placeholder="Enter Email"
          name="email"
          label="Email"
          type="email"
          className=" text-sm"
          disabled={isPending}
        />
        <Input
          {...register("password", { required: true })}
          error={errors.password?.message}
          placeholder="Enter Password"
          type="password"
          name="password"
          label="password"
          className=" text-sm"
          disabled={isPending}
        />
        <Input
          {...register("passwordConfirm", { required: true })}
          error={errors.passwordConfirm?.message}
          placeholder="Re-enter Password"
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          className=" text-sm"
          disabled={isPending}
        />
        <div className="flex items-center justify-end">
          <Link className="underline" href="/login">
            Already have an account?
          </Link>
        </div>
        <div className="mt-4">
          <Button
            size="sm"
            className="w-full text-sm"
            type="submit"
            disabled={isPending}
          >
            Signup
          </Button>
          <Separator className="my-4 bg-gray-400" />
          <Button
            type="button"
            size="sm"
            className="w-full mb-2 flex items-center gap-2 text-sm"
            onClick={() => signIn("google")}
            disabled={isPending}
          >
            <FcGoogle size="1.6rem" /> Signup with Google
          </Button>
          <Button
            type="button"
            size="sm"
            className="w-full flex items-center gap-2 text-sm"
            variant="outline"
            onClick={() => signIn("github")}
            disabled={isPending}
          >
            <FaGithub size="1.6rem" /> Signup with GitHub
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
