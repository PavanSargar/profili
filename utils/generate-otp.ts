import { randomBytes } from "crypto";

const generateOtp = () => {
  const buffer = randomBytes(6);
  let otp = "";
  for (let i = 0; i < buffer.length; i++) {
    otp += buffer[i].toString().padStart(3, "0").slice(0, 1);
  }
  return otp;
};

export const generateAndExpireOTP = () => {
  const otp = generateOtp();

  let creationTime = new Date();
  let expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 5);

  return { otp, expiryTime, creationTime };
};

export const isOTPValid = (expiryTime: any) => {
  const currentTimestamp = new Date();
  const expiryTimestamp = new Date(expiryTime);

  return Boolean(currentTimestamp <= expiryTimestamp);
};
