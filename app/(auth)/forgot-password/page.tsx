"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OTPForm from "./otp-form";
import PasswordForm from "./password-form";
import EmailForm from "./email-form";
import { useChangePassword, useOtp, useVerifyOtp } from "../auth.service";

interface ForgotPasswordProps {}

const ForgotPassword = (props: ForgotPasswordProps) => {
  const [step, setStep] = useState<number>(0);
  const { mutate, isPending, error, isSuccess } = useOtp();
  const {
    data: verifyOtpData,
    mutate: mutateVerifyOtp,
    isPending: isVerifyOtpPending,
    isSuccess: isVerifyOtpSuccess,
  } = useVerifyOtp();

  const {
    mutate: mutateChangePassword,
    isPending: isChangePasswordPending,
    isSuccess: isChangePasswordSuccess,
  } = useChangePassword();

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      setStep(1);
    }
    if (isVerifyOtpSuccess) {
      setStep(2);
    }
    if (isChangePasswordSuccess) {
      router.push("/login");
    }
  }, [isSuccess, isVerifyOtpSuccess, isChangePasswordSuccess]);

  const handleRequestOtp = async (email: string) => {
    mutate(email);
  };
  const handleVerifyOtp = (otp: string) => {
    mutateVerifyOtp(otp);
  };
  const handleChangePassword = (password: string) => {
    mutateChangePassword({ password, user: verifyOtpData?.data?.userId });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100svh]">
      {step === 0 && (
        <EmailForm loading={isPending} onRequestOtp={handleRequestOtp} />
      )}
      {error && <p className="text-destructive">{error?.message}</p>}

      {step === 1 && (
        <OTPForm loading={isVerifyOtpPending} onVerifyOtp={handleVerifyOtp} />
      )}

      {step === 2 && (
        <PasswordForm onSubmitNewPassword={handleChangePassword} />
      )}
    </div>
  );
};

export default ForgotPassword;
