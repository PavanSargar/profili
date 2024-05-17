"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Separator } from "@components/ui/separator";
import { registerSchema } from "../schema";
import { useToast } from "@components/ui/use-toast";

type Props = {};

// TODO: remove yup and use zod instead

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = (props: Props) => {
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = session.status === "authenticated";
    if (isAuthenticated) {
      redirect("/");
    }
  }, [session]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await axios.post(
        "/api/auth/register",
        {
          ...data,
        },
        { withCredentials: true }
      );
      router.push("/login");
      toast({
        title: "Signup successful. Login to continue",
        variant: "successive",
      });
    } catch (error: any) {
      toast({
        title: error?.message || "Something went wrong please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center border h-[100svh]">
      <form
        className="justify-center block w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("firstName", { required: true })}
          error={errors.firstName?.message}
          placeholder="Enter First Name"
          name="firstName"
          label="First name"
          type="text"
          className="mb-2 text-lg"
        />
        <Input
          {...register("lastName", { required: true })}
          error={errors.lastName?.message}
          placeholder="Enter Last Name"
          name="lastName"
          label="Last name"
          type="text"
          className="mb-2 text-lg"
        />
        <Input
          {...register("email", { required: true })}
          error={errors.email?.message}
          placeholder="Enter Email"
          name="email"
          label="Email"
          type="email"
          className="mb-2 text-lg"
        />
        <Input
          {...register("password", { required: true })}
          error={errors.password?.message}
          placeholder="Enter Password"
          type="password"
          name="password"
          label="password"
          className="mb-2 text-lg"
        />
        <Input
          {...register("passwordConfirm", { required: true })}
          error={errors.passwordConfirm?.message}
          placeholder="Re-enter Password"
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          className="mb-2 text-lg"
        />
        <div className="flex items-center justify-end">
          <Link className="underline" href="/login">
            Already have an account?
          </Link>
        </div>
        <div className="mt-4">
          <Button size="lg" className="w-full text-lg" type="submit">
            Signup
          </Button>
          <Separator className="my-4 bg-gray-400" />
          <Button
            type="button"
            size="lg"
            className="w-full mb-2 flex items-center gap-2 text-lg"
          >
            <FcGoogle size="1.6rem" /> Signup with Google
          </Button>
          <Button
            type="button"
            size="lg"
            className="w-full flex items-center gap-2 text-lg"
          >
            <FaGithub size="1.6rem" /> Signup with GitHub
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
