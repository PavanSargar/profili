import { useMutation } from "@tanstack/react-query";
import axiosClient from "config/_axios-client";
import { useToast } from "@components/ui/use-toast";
import { RegisterFormValues } from "./auth.schema";
import { errorTypes } from "@api/_config/constants";

const registerUser = async (data: RegisterFormValues) => {
  return await axiosClient.post("/api/auth/register", {
    ...data,
  });
};

export const useRegisterUser = () => {
  const { toast } = useToast();

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: registerUser,
    onSuccess(data, variables, context) {
      toast({
        title: "Registration successful. Login to continue",
        variant: "successive",
      });
    },
    onError(error: any, variables, context) {
      const message = error?.response?.data?.error?.message;
      const errors = error?.response?.data?.error?.errors as string[];

      if (message === errorTypes.validation) {
        toast({
          title: `Validation Error`,
          description: `${errors?.join("\n")}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: `There's some issue while registering user. Please try again later.`,
          variant: "destructive",
        });
      }
    },
  });

  return { mutate, data, error, isPending, isSuccess };
};

const requestOTP = async (email: string) => {
  return await axiosClient.get(`/api/auth/otp/${email}`);
};
const useOtp = () => {
  const { toast } = useToast();

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: requestOTP,
    onSuccess(data, variables, context) {
      toast({
        title: `OTP sent to ${variables}.`,
        variant: "successive",
      });
    },
    onError(error, variables, context) {
      toast({
        title: `There's some issue while sending OTP. Please try again later.`,
        variant: "destructive",
      });
    },
  });

  return { mutate, data, error, isPending, isSuccess };
};

const verifyOtp = async (otp: string) => {
  return await axiosClient.post("/api/auth/otp", { otp });
};

const useVerifyOtp = () => {
  const { toast } = useToast();

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: verifyOtp,
    onSuccess(data, variables, context) {
      toast({
        title: `OTP verified successfully.`,
        variant: "successive",
      });
    },
    onError(error, variables, context) {
      toast({
        title: `There's some issue while verifying otp. Please try again later.`,
        variant: "destructive",
      });
    },
  });

  return { mutate, data, error, isPending, isSuccess };
};

const changePassword = async ({
  password,
  user,
}: {
  password: string;
  user: string;
}) => {
  await axiosClient.put("/api/auth/otp", { newPassword: password, user });
};

const useChangePassword = () => {
  const { toast } = useToast();

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: changePassword,
    onSuccess(data, variables, context) {
      toast({
        title: `Password changed successfully.`,
        variant: "successive",
      });
    },
    onError(error, variables, context) {
      toast({
        title: `There's some issue while changing password. Please try again later.`,
        variant: "destructive",
      });
    },
  });

  return { mutate, data, error, isPending, isSuccess };
};

export { useOtp, useVerifyOtp, useChangePassword };
