"use client";
import React from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "@components/loader";

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
      <h2 className="mb-1">Enter your registered Email Id</h2>
      <Input
        {...register("email", { required: true })}
        error={errors.email?.message}
        placeholder="Enter Email"
        name="email"
        label="Email"
        type="email"
        className="text-md mb-2"
        required
      />
      <div className="flex items-center justify-end">
        <Button className="w-fit" disabled={loading} type="submit" size="sm" variant='outline'>
          {loading ? (
            <span className="flex items-center gap-1">
              Requesting OTP <Loader />
            </span>
          ) : (
            "Request OTP"
          )}
        </Button>
      </div>
    </form>
  );
};

export default EmailForm;
