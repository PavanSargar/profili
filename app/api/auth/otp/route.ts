import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@api/db";
import { isOTPValid } from "@utils/generate-otp";
import OtpModel from "@models/otp.model";
import UserModel from "@models/user.model";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { otp } = await req.json();
    await dbConnect();
    const foundOtp = await OtpModel.findOne({ otp });

    if (!foundOtp) {
      return new NextResponse(`Invalid OTP.`, { status: 500 });
    }

    if (!isOTPValid(foundOtp?.expiredAt)) {
      return new NextResponse(`OTP expired. Please generate new one`, {
        status: 500,
      });
    }

    await OtpModel?.findOneAndUpdate(
      { otp },
      {
        $set: {
          isUsed: true,
        },
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      status: 200,
      userId: foundOtp?.user,
    });
  } catch (err: any) {
    throw new NextResponse(err, {
      status: 500,
    });
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const { newPassword, user } = await req.json();
    await dbConnect();
    const foundOtp = await OtpModel.findOne({ user }).sort({
      createdAt: -1,
    });

    if (!foundOtp) {
      return new NextResponse(`Unauthorized`, {
        status: 401,
      });
    }
    if (!foundOtp?.isUsed) {
      return new NextResponse(`Unauthorized`, {
        status: 401,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await UserModel.findOneAndUpdate(
      { _id: user },
      {
        $set: {
          password: hashedPassword,
          passwordConfirm: hashedPassword,
        },
      },
      { new: true }
    );

    if (!updatedPassword) {
      return new NextResponse(`Error while updating password`, {
        status: 500,
      });
    }

    return new NextResponse(`Password changed successfully.`, {
      status: 200,
    });
  } catch (err: any) {
    throw new NextResponse(err, {
      status: 500,
    });
  }
};
