"use client";
import React from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

interface EmailFormProps {
  onRequestOtp: (email: string) => void;
  loading: boolean;
}

const EmailForm = ({ onRequestOtp, loading }: EmailFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    if (onRequestOtp) {
      onRequestOtp(data.email);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email", { required: true })}
        error={errors.email?.message}
        placeholder="Enter Email"
        name="email"
        label="Email"
        type="email"
        className=" text-lg"
        required
      />

      <Button disabled={loading} type="submit" className="w-fit">
        {loading ? "Requesting OTP" : "Request OTP"}
      </Button>
    </form>
  );
};

export default EmailForm;
