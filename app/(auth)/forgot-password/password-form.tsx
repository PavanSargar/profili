import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { newPasswordSchema } from "../auth.schema";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

interface PasswordFormProps {
  onSubmitNewPassword: (password: string) => void;
  loading: boolean;
}

type RegisterFormValues = z.infer<typeof newPasswordSchema>;

const PasswordForm = ({ onSubmitNewPassword, loading }: PasswordFormProps) => {
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
        placeholder="Enter password"
        type="password"
        name="password"
        label="Password"
        className="mb-2 text-sm"
      />
      <Input
        {...register("passwordConfirm", { required: true })}
        error={errors.passwordConfirm?.message}
        placeholder="Re-enter password"
        type="password"
        name="passwordConfirm"
        label="Re-enter password"
        className="mb-2 text-sm"
      />

      <div className="flex items-center justify-end">
        <Button type="submit" size="sm" variant="outline" disabled={loading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
