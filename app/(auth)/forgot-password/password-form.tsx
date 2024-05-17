import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { newPasswordSchema } from "../schema";
import { Input } from "@components/ui/input";
import { z } from "zod";
import { Button } from "@components/ui/button";

interface PasswordFormProps {
  onSubmitNewPassword: (password: string) => void;
}

type RegisterFormValues = z.infer<typeof newPasswordSchema>;

const PasswordForm = ({ onSubmitNewPassword }: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    if (onSubmitNewPassword) {
      onSubmitNewPassword(data?.password);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="Enter passwordConfirm"
        type="password"
        name="passwordConfirm"
        label="Re-enter Password"
        className="mb-2 text-lg"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default PasswordForm;
