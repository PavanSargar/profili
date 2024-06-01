import { NextRequest, NextResponse } from "next/server";
import { MailOptions } from "nodemailer/lib/json-transport";
import User from "@api/_models/user.model";
import OtpModel from "@api/_models/otp.model";
import dbConnect from "@api/_config/db";
import sendMail from "@api/_helpers/send-mail";
import { generateAndExpireOTP, isOTPValid } from "@api/_helpers/generate-otp";
import { getOtpTemplate } from "@api/_templates/otp";

interface IGetParams {
  params: {
    email: string;
  };
}
export const GET = async (req: NextRequest, { params }: IGetParams) => {
  const email = params?.email;

  //TODO: validate params and body using zod
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return new NextResponse(
        `Account with ${email} doesn't exists. Try with another email.`,
        { status: 400 }
      );

    const { otp, creationTime, expiryTime } = generateAndExpireOTP();

    const options: MailOptions = {
      to: email,
      replyTo: "pavansargar36@gmail.com",
      subject: "Forget password Otp",
      text: "This email is sent from the command line",
      html: getOtpTemplate({ otp }),
      textEncoding: "base64",
    };

    const mailId = await sendMail(options);

    if (typeof mailId !== "string") {
      return new NextResponse(`Error while sending email.`, { status: 500 });
    }

    const newOtp = new OtpModel({
      otp,
      user: existingUser?._id,
      createdAt: creationTime,
      expiredAt: expiryTime,
    });

    await newOtp.save();

    return new NextResponse(`OTP sent to ${email}.`, {
      status: 200,
    });
  } catch (err: any) {
    throw new NextResponse(err, {
      status: 500,
    });
  }
};
